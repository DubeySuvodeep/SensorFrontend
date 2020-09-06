import React from 'react';

import { Table } from 'react-bootstrap';
import styled from 'styled-components';


export default function TableData(props){
    let seriesData = {...props.seriesData};
    
    function epochToJsDate(dateArray){
        return (dateArray.map( (x,i) => { return ( String(new Date(x*1000)).replace(" GMT+0530 (India Standard Time)", ""))}));
    }

    function sumOfArray(total, num ){
        return total+ Math.round(num);
    }

    const totalSum = seriesData.readingseries.reduce(sumOfArray, 0);

    const meanOfArray = seriesData.readingseries.length!==0?(totalSum/seriesData.readingseries.length).toFixed(2):0;
    
    return(
        <div 
            style={{ position:"relative", overflow: "hidden", overflowY: "scroll",  height: "500px", top: "340px"}}
        >
            <Table striped bordered hover variant="dark" responsive="sm">
                <thead style={{ position:"sticky" }}>
                    <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Reading</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        epochToJsDate(seriesData.timeseries).map((x, i) => {
                            return [
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{x}</td>
                                    <td>{seriesData.readingseries[i]}</td>
                                </tr>
                            ];
                        })
                    }
                    <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <span><b>Max: </b> {seriesData.readingseries.length!==0 ? Math.max.apply(null, seriesData.readingseries): 0} </span><br/>
                                        <span><b>Min: </b> {seriesData.readingseries.length!==0 ? Math.min.apply(null, seriesData.readingseries): 0} </span><br/>
                                        <span><b>Sum: </b> {totalSum}</span><br/>
                                        <span><b>Mean: </b> {meanOfArray}</span><br/>
                                    </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}