import React, {Component} from 'react'
import './article.css'
class Article extends Component {

    render(){
        
        return(
            <div className="card" id="card">
                <a href={this.props.url} >
                    <img 
                    className="card-img-top" 
                    src={this.props.urlToImage} 
                    alt={this.props.title}/>
                </a>

                <div className="card-body">
                    <h5 className="card-title" >{this.props.title}</h5>
                    <hr/>
                    <span className="card-text">{this.props.description}</span>  
                </div>

                <div className="card-body">
                    <a href={this.props.url} 
                    className="card-link">
                    Read the full story hear
                    </a>
                    <p style={{fontSize:'smaller', color:'#777'}}>Source: {this.props.sourceName}</p>
                </div>
            </div>
        );
    }
}

export default Article