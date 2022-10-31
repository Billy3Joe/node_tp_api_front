// import { Grid } from "@mui/material";

// const Home = () => {
//   return <>
//     <Grid container justifyContent='center'>
//       <Grid item sm={10}>
//         <h1>Home Page</h1>
//         <hr />
//         <p>Home Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum officiis debitis vel tenetur quos animi vero voluptates reiciendis, omnis sed in libero temporibus deleniti pariatur expedita corporis officia. Odit enim, quasi facere magnam earum officiis ipsa aliquid impedit velit quibusdam dolor ex esse ratione explicabo quod, culpa temporibus? Dolorem deleniti doloremque maxime quas deserunt. Ex aspernatur saepe illo eaque corrupti placeat, aperiam nulla adipisci itaque quos necessitatibus iure at minus non delectus ratione quod ad. Alias dolore perferendis est expedita iure! Nostrum laborum tempore amet commodi voluptas accusamus enim repudiandae, quia odio cumque, laboriosam architecto illo! Aliquid, fuga quis.</p>
//       </Grid>
//     </Grid>
//   </>;
// };

// export default Home;

import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from "react-router-dom"
import axios from "axios"
import moment from "moment"
import Alert from 'react-bootstrap/Alert';

const Home = () => {

    const [data, setData] = useState([]);
    // console.log(data)

    const [show, setShow] = useState(false);

    const getBookData = async () => {
        const res = await axios.post("/create-book", {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status === 401 || !res.data) {
            console.log("errror")
        } else {
            setData(res.data.getBook)
        }

    }

    const dltUser = async (id) => {
        const res = await axios.delete(`/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status === 401 || !res.data) {
            console.log("errror")
        } else {
            console.log("book delete");
            setShow(true)
        }
    }

    useEffect(() => {
        getBookData()
    }, [dltUser])
    return (
        <>
            {
                show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    Book Delete
                </Alert> : ""
            }
            <div className='container mt-2'>
                <h1 className='text-center mt-2'>MERN Image Upload Projects</h1>
                <div className='text-end'>
                    <Button variant="primary"><NavLink to="/register" className="text-decoration-none text-light">Add User</NavLink></Button>
                </div>

                <div className='row d-flex justify-content-between align-iteams-center mt-5'>

                    {
                        data.length > 0 ? data.map((el, i) => {
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: "18rem" }} className="mb-3">
                                        <Card.Img variant="top" style={{ width: "100px", textAlign: "center", margin: "auto" }} src={`/uploads/${el.imgpath}`} className='mt-2' />
                                        <Card.Body className='text-center'>
                                            <Card.Title>User Name : {el.fname}</Card.Title>
                                            <Card.Text>
                                                Date Added :{moment(el.date).format("L")}
                                            </Card.Text>
                                            <Button variant="danger" className='col-lg-6 text-center' onClick={() => dltUser(el._id)}>Delete</Button>
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                        }) : ""
                    }
                </div>
            </div>
        </>
    )
}

export default Home
