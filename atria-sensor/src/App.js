import React, {useState} from 'react';
import './App.css';
import Input from './component/input'; 
import Graph from './component/graph';
import TableData from './component/table';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';


const Paragraph = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 70px;
  color: #3C1B14;
`; 


const Container = styled.div`
 background-color: #DFC3B9;
`;


function App() {

  const [ timeSeries, setTimeSeries ] = useState([]);
  const [ readingSeries, setReadingSeries ] = useState([]);
  const [ sensorType, setSensorType ] = useState('');

  function setDataForChart(timeseries, readingseries, sensortype){
    setTimeSeries(timeseries);
    setReadingSeries(readingseries);
    setSensorType(sensortype);
  }

  return (
    <div className="App" style={{ overflow: "hidden", overflowY: "scroll",  height: "1000px"}}>
      <Container>
        <Paragraph>ATRIA SENSORS</Paragraph>
        <Input setData={setDataForChart}/>
        <Graph seriesData={{'timeseries':timeSeries, 'readingseries':readingSeries, 'sensortype':sensorType}}/>
        <TableData seriesData={{'timeseries':timeSeries, 'readingseries':readingSeries, 'sensortype':sensorType}}/>
      </Container>
    </div>
  );
}

export default App;
