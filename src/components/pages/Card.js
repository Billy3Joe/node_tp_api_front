import "../pages/styles.css";
import React, { Component } from "react";
import {NavLink} from 'react-router-dom';

//Function pour supprimer à gérer
const deleteBookData = async (e) => {}

//Function pour modifier à gérer
const updateBookData = async (e) => {}

export default class Card extends Component {
  render() {
    const URL =`single-book/${this.props.id}`;
    return (
      <div className="card">
        <NavLink to={URL}>
         <img src={this.props.imageURL} alt="imageURL" style={{width:"390px", height:"250px"}} />
        </NavLink>
       
        <div className="card-body">
          <h2>{this.props.title}</h2>
          <p>{this.props.categories}</p>
          <p>{this.props.description}</p>
          <p>{this.props.price}</p>
          <p>{this.props.createdAt}</p>
    
          <p style={{display:"flex", gap:"10px", justifyContent:"center"}}> 
            <button type="submit" className="delete" onClick={deleteBookData}>
              Delete
            </button>

            <button type="submit" className="update" onClick={updateBookData}>
            Update
            </button>
          </p>

          <h5>{this.props.author}</h5>
        </div>
      </div>
    );

    
  }
}
