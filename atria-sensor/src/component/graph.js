import React, {useState} from 'react';
import {Line} from 'react-chartjs-2';
import styled from 'styled-components';


const Grpah = styled.div`
  position: relative;
  top: 200px;
`;

export default function Graph(props) {

    let seriesData = {...props.seriesData};

    function epochToJsDate(dateArray){
        return (dateArray.map( (x,i) => { return ( String(new Date(x*1000)).replace(" GMT+0530 (India Standard Time)", ""))}));
    }

    const state = {
        labels: epochToJsDate(seriesData.timeseries),
        datasets: [
          {
            label: seriesData.sensortype,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: seriesData.readingseries
          }
        ]
      }

    return (
      <Grpah>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text: String(seriesData.sensortype + ' Reading per day'),
              fontSize:20,
              responsive:true
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </Grpah>
    );
}
