import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import Article from '../Card/article';
import SearchBar from '../Search/form';
import Chart from '../Chart/chart';
import {getHeadlines} from '../../store/actions/headlines'
import {removeError} from '../../store/actions/error'
import './mainDisplay.css';


class mainDisplay extends Component {

  static propTypes = {
    getHeadlines: PropTypes.func.isRequired,
    headlines: PropTypes.array.isRequired,
    chartData: PropTypes.array.isRequired,
    removeError: PropTypes.func.isRequired

  }

  static defaultProps = {
  }

  submit = values => {
    this.props.getHeadlines(values)
    .catch(error => console.log('submit error',error))
  }

  removeError = () => {
    console.log('hit button');
    this.props.removeError();
  }

  render() {
    const {error} = this.props

    if(error[0]){
      console.log(error)
      return(
        <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 align-self-center" style={{marginTop:"15%"}}>
                <div className="d-flex justify-content-center">
                <p style={{color:"#999999", fontSize:"large"}}>Oops something went wrong..Error code {this.props.error}</p>
                </div>
              </div>
            </div>
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary btn-lg"onClick={this.removeError}> Try Again </button>
                  </div>
                </div>
              </div>
            </div>
      )
    }else{
      console.log('main else')
      console.log('the error',error)
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
}

const mapStateToProps = (state) => ({
  headlines: state.headlines,
  form: state.form,
  chartData: state.chart,
  labels: state.chart[0],
  datasets: state.chart[1],
  error: state.error
})

const dispatchToProps = (dispatch) => ({
   getHeadlines: (values) => dispatch(getHeadlines(values)),
   removeError: () => dispatch(removeError())
})

export default connect(mapStateToProps, dispatchToProps)(mainDisplay);
