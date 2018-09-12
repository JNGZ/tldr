import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';

import Article from '../Card/article';
import SearchBar from '../Search/form';
import Chart from '../Chart/chart';


import {getHeadlines} from '../../store/actions/headlines'


import './mainDisplay.css';



class mainDisplay extends Component {

  static propTypes = {
    getHeadlines: PropTypes.func.isRequired,
    headlines: PropTypes.array.isRequired,
    chartData: PropTypes.object.isRequired

  }

  static defaultProps = {
  }

  submit = values => {
    this.props.getHeadlines(values);
  }

  render() {

    return (
      <div> 
      <SearchBar onSubmit={this.submit} id="theSearch"/>
        <div className="container" id="container">
          <div className="row justify-content-center">
              <div className="col">
                <ul>
                  {this.props.headlines.map(article =>
                    <Article 
                      key={this.props.headlines.indexOf(article)}
                      title={article.title}
                      author={article.author} 
                      description={article.description} 
                      url={article.url} 
                      urlToImage={article.urlToImage}
                      sourceName={article.sourceName}
                      // id={article.id}
                      score={article.score}
                      style={{backgroundColor:'blue'}}
                    />
                  )}
                </ul>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col">
                     <Chart labels={this.props.labels} datasets={this.props.datasets} type='bar'/>   
              </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  headlines: state.headlines,
  form: state.form,
  chartData: state.chart,
  labels: state.chart[0],
  datasets: state.chart[1]
})

const dispatchToProps = (dispatch) => ({
   getHeadlines: (values) => dispatch(getHeadlines(values))
})

export default connect(mapStateToProps, dispatchToProps)(mainDisplay);
