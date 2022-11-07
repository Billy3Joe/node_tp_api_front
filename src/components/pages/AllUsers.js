
import { Grid } from "@mui/material";
import "../pages/styles.css";
import axios from "axios";
import CardUser from "../pages/CardUser";
import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import ReactLoading from "react-loading";

export default class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isloading: true
    };
  }

  async componentDidMount() {
    await axios.get(`http://localhost:5000/api/v1/all-user`).then((res) => {
      const users = res;
      this.setState({ users, isloading: false });
    });
  }

  render() {
    let res = this.state.users;
    let { isloading } = this.state;
    return (
      <>
       <Grid container justifyContent='center'>
        <Grid item sm={10}> 
           <div style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
            <h1 style={{textAlign:"center"}}>ALL USERS</h1>
            <p style={{textAlign:"center"}}><NavLink to='/create-user' >CREATE USER</NavLink></p>
           </div>
            <hr />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum officiis debitis vel tenetur quos animi vero voluptates reiciendis, omnis sed in libero temporibus deleniti pariatur expedita corporis officia. Odit enim, quasi facere magnam earum officiis ipsa aliquid impedit velit quibusdam dolor ex esse ratione explicabo quod, culpa temporibus? Dolorem deleniti doloremque maxime quas deserunt. Ex aspernatur saepe illo eaque corrupti placeat, aperiam nulla adipisci itaque quos necessitatibus iure at minus non delectus ratione quod ad. Alias dolore perferendis est expedita iure! Nostrum laborum tempore amet commodi voluptas accusamus enim repudiandae, quia odio cumque, laboriosam architecto illo! Aliquid, fuga quis.</p>
        </Grid>
       </Grid>
        {isloading ? (
          <ReactLoading type={"bars"} color="#021155" />
        ) : (
            <div className="cards">
              {res?.data?.data?.map((x) => {
                return (
                  <CardUser
                    name={x.name}
                    email={x.email}
                    phone={x.phone}
                    role={x.role}
                  />
                );
              })}
            </div>
        )}
      </>
    );
  }
}
