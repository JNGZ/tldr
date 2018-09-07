import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';


import SearchBar from '../Search/form'

import {getCustomers} from '../../store/actions/customer'
import {getHeadlines} from '../../store/actions/headlines'


import './mainDisplay.css';

import Article from '../Card/article';

class mainDisplay extends Component {

  static propTypes = {
    getHeadlines: PropTypes.func.isRequired,
    headlines: PropTypes.array.isRequired,

  }

  static defaultProps = {
    headlines: []
  }

  submit = values => {
    this.props.getHeadlines(values);
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
  form: state.form
})

const dispatchToProps = (dispatch) => ({
   getCustomers: () => dispatch(getCustomers()),
   getHeadlines: (values) => dispatch(getHeadlines(values)),
})

export default connect(mapStateToProps, dispatchToProps)(mainDisplay);
