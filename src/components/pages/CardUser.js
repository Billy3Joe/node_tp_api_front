import "../pages/styles.css";
import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import axios from "axios";
// import {NavLink} from 'react-router-dom';

//Function pour supprimer à gérer
const dltUser = async (id) => {
  const res = await axios.delete(`http://localhost:5000/api/v1/delete-user/${id}`, {
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
  });

  if (res.data.status === 401 || !res.data) {
      console.log("errror")
  } else {
      console.log("book delete");
      //Pour actualiser la page automatiquement après la suppression
      window.location.reload(false);
  }
}

//Function pour modifier à gérer
const updateUserData = async (e) => {}

export default class CardUser extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h2>{this.props.name}</h2>
          <p>{this.props.email}</p>
          <p>{this.props.phone}</p>
          <p>{this.props.role}</p>
    
          <p style={{display:"flex", gap:"10px", justifyContent:"center"}}> 
              <button type="submit" className="delete" onClick={dltUser}>
                Delete
              </button>
          
            <NavLink to='/change-role-user'>
              <button type="submit" className="update" onClick={updateUserData}>
              Change rôle user
              </button>
            </NavLink>

            <NavLink to='/update-user'>
              <button type="submit" className="update" onClick={updateUserData}>
              Update
              </button>
           </NavLink>
          </p>

        </div>
      </div>
    );
  }
}
