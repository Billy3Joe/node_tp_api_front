import "../pages/styles.css";
import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import axios from "axios";

//Function pour supprimer à gérer
const dltBook = async (id) => {
  const res = await axios.delete(`http://localhost:5000/api/v1/delete-Book/${id}`, {
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
  });

  if (res.data.status === 401 || !res.data) {
      console.log("errror")
  } else {
      console.log("book delete");
  }
}

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
          <h2  style={{color:"#000", textTransform:"uppercase"}}>{this.props.title}</h2>
          <p  style={{color:"orange", textTransform:"uppercase"}}>{this.props.categories}</p>
          <p style={{textAlign:"center"}}>{this.props.description}</p>
          <p>PRIX : <strong style={{fontWeight:"bold"}}>{this.props.price} €</strong></p>
          <p>ISBN :  <strong style={{fontWeight:"bold"}}>{this.props.isbn}</strong></p>
          <p>{this.props.nbr_pages} pages</p>
          <p>{this.props.createdAt}</p>
          {window.localStorage.getItem("isAdmin")==="true"?
          <p style={{display:"flex", gap:"10px", justifyContent:"center"}}> 
            <button type="submit" className="delete" onClick={dltBook}>
              Delete
            </button>

            <button type="submit" className="update" onClick={updateBookData}>
            Update
            </button>
          </p>:""
          }
          

          <h5>Publué par <strong style={{color:"green", textDecoration:"underline"}}>{this.props.author}</strong></h5>
        </div>
      </div>
    );

    
  }
}
