import { Grid } from "@mui/material";
import "../pages/styles.css";
import axios from "axios";
// import Card from "../pages/Card";
import Retour from '../../images/retour.png';
import Logout from '../../images/logout.webp';
import React, { Component } from "react";
import { NavLink} from 'react-router-dom';
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
   }
class SingleBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book:{},
      isloading: true
    };
  }

  async componentDidMount() {
    let { id } = this.props.params;
    console.log(id);
    await axios.get(`http://localhost:5000/api/v1/single-book/${id}`).then((res) => {
        // console.log(res);
      const book = res.data.data;
      this.setState({ book, isloading: false });
    });
  }

  render() {
    let x = this.state.book;
    console.log(`Data disponible`,x.imageURL);
    let { isloading } = this.state;

       //Function Logout;
       const handleLogout = () => {
        console.log("Logout Clicked");
        window.localStorage.clear();
        // navigate('/');
      }
    return (
      <>
        <Grid container justifyContent='center'>
        <Grid item sm={10}> 
           <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
           <br />
           <div style={{display:"flex", justifyContent:"center", gap:"100px"}}>
            <h1><NavLink to='/'style={{textAlign:"center",backgroundColor:"orange",borderRadius:"10px", padding:"3px", color:"#fff", textDecoration:"none", fontSize:"30px"}} ><img style={{width:"100px", heigth:"100px"}} src={Retour} alt="Retour btn" / ></NavLink></h1>
            <h1><NavLink to='/'onClick={handleLogout} style={{textAlign:"center",backgroundColor:"orange",borderRadius:"10px", padding:"3px", color:"#fff", textDecoration:"none", fontSize:"30px"}} ><img style={{width:"100px", heigth:"100px"}} src={Logout} alt="Logout btn" / ></NavLink></h1>
           </div>
            {/* <img style={{width:"290px", heigth:"290px"}} src={Logo} alt="Logo" / > */}
            <h1><NavLink to='/all-user'style={{textAlign:"center", color:"orange", textDecoration:"none", fontSize:"35px", fontWeight:"bold"}} >BOOK STARBOOK ACADEMY</NavLink></h1>
            {/* <h1 style={{textAlign:"center"}}>ALL BOOKS</h1> */}
           </div>
            <hr />
          
        </Grid>
       </Grid>
        {isloading ? (
          <ReactLoading type={"bars"} color="#021155" />
        ) : (
            <div className="card-single-book">
              <img src={x.imageUrl} alt="imageUrl" style={{width:"390px", height:"250px"}} />
               <div className="card-body-single-book">
                 <h2  style={{color:"#000", textTransform:"uppercase"}}>{x.title}</h2>
                 <p  style={{color:"orange", textTransform:"uppercase"}}>{x.categories}</p>
                 <p style={{textAlign:"center"}}>{x.description}</p>
                 <p>PRIX : <strong style={{fontWeight:"bold"}}>{x.price} €</strong></p>
                 <p>ISBN :  <strong style={{fontWeight:"bold"}}>{x.isbn}</strong></p>
                 <p>{x.nbr_pages} pages</p>
                 <p>{x.createdAt}</p>    
                 <h5>Publué par <strong style={{color:"green", textDecoration:"underline"}}>{x.author}</strong></h5>
                 <br />
              </div>
              <div className="comments">
                <h1>Commentaires</h1>

                <p>Premier commentaire avec son auteur</p>
                <p>Deuxième commentaire avec son auteur</p>
                <p>Troisième commentaire avec son auteur</p>

                <h1>Commenter</h1>
                <div className="review-comment-form">
                  <div className="reply-title">
                    <span className="r-title">
                      Be the first to review “Wellness And Paradise”
                    </span>
                  </div>
                  <div className="from-group">
                    <textarea
                      class="comment-form comment-form-comment"
                      placeholder="Your review"
                      rows="8"
                      columns="45"
                    ></textarea>
                    <input
                      type="text"
                      class="comment-form comment-form-author"
                      placeholder="Your name"
                    />
                     <input
                      type="text"
                      class="comment-form comment-form-author"
                      placeholder="Your grade"
                    />

                  </div>
                  <button className="registerButton" type="submit" style={{padding:"5px"}}>
                  Envoyer
                </button>
                </div>
              </div>
            </div>   
        )}
      </>
    );
  }
}
export default withParams(SingleBook);