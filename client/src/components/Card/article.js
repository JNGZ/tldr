import React, {Component} from 'react'
import './article.css'
class Article extends Component {

    render(){
        if (this.props.score < 0)  {
            return(
                <div className="card" id="negative">
                    <a href={this.props.url} >
                        <img id='img'
                        className="card-img-top" 
                        src={this.props.urlToImage} 
                        alt={this.props.title}/>
                    </a>
    
                    <div className="card-body" id='textbody'>
                        <h5 className="card-title" >{this.props.title}</h5>
                        <p style={{fontSize:'smaller'}}>{this.props.author}</p>
                        <hr/>
                        Negative <span className="badge badge-danger">{this.props.score}</span>
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
            }else if(this.props.score > 0){ 
                return(
                <div className="card" id="positive">
                    <a href={this.props.url} >
                        <img id='img'
                        className="card-img-top" 
                        src={this.props.urlToImage} 
                        alt={this.props.title}/>
                    </a>
    
                    <div className="card-body" id='textbody'>
                        <h5 className="card-title" >{this.props.title}</h5>
                        <p style={{fontSize:'smaller'}}>{this.props.author}</p>
                        <hr/>
                        Positive <span className="badge badge-success">{this.props.score}</span>
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
                
            }else{
                return(
                    <div className="card" id="neutral">
                        <a href={this.props.url} >
                            <img id='img'
                            className="card-img-top" 
                            src={this.props.urlToImage} 
                            alt={this.props.title}/>
                        </a>
        
                        <div className="card-body" id='textbody'>
                            <h5 className="card-title" >{this.props.title}</h5>
                            <p style={{fontSize:'smaller'}}>{this.props.author}</p>
                            <hr/>
                            Neutral <span className="badge badge-secondary">{this.props.score}</span>
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
}

export default Article