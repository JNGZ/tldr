import React from 'react'
import { Field, reduxForm } from 'redux-form'
import './form.css'

let SearchBar = props => {
    const { handleSubmit } = props
    return(
    <form onSubmit={handleSubmit}>
        <div>
            <Field 
            className="form-control mr-sm-2"
            id="searchBar" 
            name="query" 
            component="input" 
            type="text" 
            placeholder= "Search worldwide news here.."
            style={{textAlign: 'center'}}
            data-toggle="tooltip"
            />
           
        </div>
    </form>)
}

export default SearchBar = reduxForm({form: 'search'})(SearchBar)