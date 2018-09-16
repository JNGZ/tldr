import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import './chart.css';

class Chart extends Component{

    options = {
            scales:{
                xAxes: [{stacked: true}],
                yAxes: [{
                    ticks:{
                        beginAtZero: true
                    }
                }]
            },
            legend:{
                position: 'right'
            },
            title:{
                position: 'top',
                display: true,
                text: 'Aggregate Semantic Scores by Source'
            }
            
        }


    render(){
        return(
            <div id="Bar">
                <Bar
                data={{
                    labels: this.props.labels,
                    datasets: this.props.datasets
                }}
                options={this.options}/>
            </div>
        )
    }
}


export default Chart