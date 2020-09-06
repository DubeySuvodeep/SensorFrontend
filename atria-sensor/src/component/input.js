import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './component.css';

const SubmitButton = styled.button`
    position: absolute;
    top: 220px;
    left: 38px;
    height: 23px;
    width: 115px;
    font-size: 12px;
    margin: 2px 2px 2px 2px;
    padding: 1px;
    background-color: #AA8D83;
    border: 1px solid #000000;
`;


const Form = styled.form`
    height: 0px;
    position: relative;
    width: 80px;
    left: 90px;
`;

const Container = styled.div`
    position: relative;
    top: -40px;
    z-index: 1;
`;

const DateInput = styled.input.attrs({type: 'date'})`
    position: absolute;
    left: 80px;
    background-color: #A77373;
`;

const DropDown = styled.select`
    position: absolute;
    left: 80px;
    background-color: #A77373;
`;

const Label = styled.label`
    position: absolute;
`;


function Input(props){

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sensorType, setSensorType] = useState('Temperature');

    function handleDate(event, datetype){
        if(datetype==='start_date'){
            setStartDate(Date.parse(event.target.value));
        }
        if(datetype==='end_date'){
            setEndDate(Date.parse(event.target.value));
        }
    }

    function handleChange(event) {
        setSensorType(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const body = {
            'start_date': startDate/1000,
            'end_date': endDate/1000,
            'sensor_type': sensorType
        };
        await axios.get(
            'http://0.0.0.0:8000/api/v1/sensor-data/',
            {params: body}
        ).then((response, sensorType) => {
            props.setData(response.data['graph_data']['time'], response.data['graph_data']['reading'], response.data['graph_data']['sensor_type']);
        }).catch((error) => {
            console.log(error.status);
        });
    }

    return (
        <Container id='analysis-container'>
            <Form onSubmit={handleSubmit} id='generate-analysis-form'>
                <Label style={{position: "absolute", top:"90px"}}>From
                    <DateInput id="from-date" name="from-date" onChange={(e) => handleDate(e, 'start_date')}></DateInput>
                </Label>

                <Label style={{position: "absolute", top:"130px"}}>To
                    <DateInput type="date" id="end-date" name="end-date" onChange={(e) => handleDate(e, 'end_date')} />
                </Label>

                <Label style={{position: "absolute", top:"170px"}}>
                    Type:
                    <DropDown value={sensorType} onChange={handleChange}>
                        <option value="Temperature">Temperature</option>
                        <option value="Rain">Rain</option>
                    </DropDown>
                </Label>

                <SubmitButton form='generate-analysis-form' type="submit" value="Submit">Generate Analysis</SubmitButton>
            </Form>
        </Container>
    );
}


export default Input;
