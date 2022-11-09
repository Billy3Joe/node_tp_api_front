import "../pages/styles.css";
import React, { Component } from "react";

// import {NavLink} from 'react-router-dom';

//Function pour supprimer à gérer
const deleteCommentData = async (e) => {}

//Function pour modifier à gérer
const updateCommentData = async (e) => {}

export default class CardComment extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h2>{this.props.message}</h2>
          <p>{this.props.grade}</p>
          <p style={{display:"flex", gap:"10px", justifyContent:"center"}}> 
            <button type="submit" className="delete" onClick={deleteCommentData}>
              Delete
            </button>

            <button type="submit" className="update" onClick={updateCommentData}>
            Update
            </button>
          </p>

        </div>
      </div>
    );

    
  }
}
