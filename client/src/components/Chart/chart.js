import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

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
            }
        }


    render(){
        return(
            <div>
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