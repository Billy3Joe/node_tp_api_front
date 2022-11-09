import "../pages/styles.css";
import axios from "axios";
import CardComment from "../pages/CardComment";
// import Logo from '../../images/logo.png';
import React, { Component } from "react";
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
    await axios.get(`http://localhost:5000/api/v1/all-user`,{
      headers:{
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then((res) => {
      const comments = res;
      this.setState({ comments, isloading: false });
    });
  }
 
  render() {
    let res = this.state.comments;
    let { isloading } = this.state;

    return (
      <>
        {isloading ? (
          <ReactLoading type={"bars"} color="#021155" style={{textAlign:"center"}} />
        ) : (
            <div className="cards">
              {res?.data?.data?.map((x) => {
                return (
                  <CardComment
                    name={x.message}
                    email={x.grade}
                  />
                );
              })}
            </div>
        )}
      </>
    ) ;
  }
}
