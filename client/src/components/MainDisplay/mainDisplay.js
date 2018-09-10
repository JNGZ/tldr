import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';


import SearchBar from '../Search/form'

import {getHeadlines} from '../../store/actions/headlines'
import {getSentiment} from '../../store/actions/sentiment'



import './mainDisplay.css';

import Article from '../Card/article';

class mainDisplay extends Component {

  static propTypes = {
    getHeadlines: PropTypes.func.isRequired,

    headlines: PropTypes.array.isRequired,
    getSentiment: PropTypes.func.isRequired,
    sentiments: PropTypes.array.isRequired,
    

  }

  static defaultProps = {
    // headlines: [],
    sentiments: []
  }

  submit = values => {
    this.props.getHeadlines(values);
    // this.props.getSentiment(values);
  }

  render() {

    return (
      <div> 
      <SearchBar onSubmit={this.submit}/>
        <div className="container" id="container">
        <div className="row">
            <div className="col">
              <ul>
                {this.props.headlines.map(article =>
                  <Article 
                    key={this.props.headlines.indexOf(article)}
                    title={article.title} 
                    description={article.description} 
                    url={article.url} 
                    urlToImage={article.urlToImage}
                    sourceName={article.sourceName}
                    id={article.id}
                    score={article.score}
                    style={{backgroundColor:'blue'}}
                  />
                )}
              </ul>
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
  sentiments: state.sentiments
})

const dispatchToProps = (dispatch) => ({
   getHeadlines: (values) => dispatch(getHeadlines(values)),
   getSentiment: (values) => dispatch(getSentiment(values))
})

export default connect(mapStateToProps, dispatchToProps)(mainDisplay);
