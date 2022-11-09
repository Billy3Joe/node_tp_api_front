import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
// import { Container, Card, Button, Form, Tab, Tabs, Row } from "react-bootstrap";
// import "../pages/styles.css";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../pages/axiosInstance";
const CreateBook = () => {
    const [error, setError] = useState({
      status: false,
      msg: "",
      type: ""
    })
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const actualData = {
        title: data.get('title'),
        categories: data.get('categories'),
        description: data.get('description'),
        price: data.get('price'),
        isbn: data.get('isbn'),
        nbr_pages: data.get('nbr_pages'),
        image: data.get('image'),
        tc: data.get('tc'),
      }
      if (actualData.title && actualData.categories && actualData.description && actualData.price && actualData.isbn && actualData.nbr_pages && actualData.tc !== null) {
          axios.post('http://localhost:5000/api/v1/create-book/',actualData,
          {
              headers:{
                  Authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
          }
          );
          console.log(actualData);
          document.getElementById('registration-form').reset()
          setError({ status: true, msg: "Create Book Successful", type: 'success' })
          // navigate('/')
       
      } else {
        setError({ status: true, msg: "All Fields are Required", type: 'error' })
      }
    }
    return <>
      <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
        <TextField margin='normal' required fullWidth id='title' name='title' label='Title' />
        <TextField margin='normal' required fullWidth id='categories' name='categories' label='Categories' />
        <TextField margin='normal' required fullWidth id='description' name='description' label='Description' />
        <TextField margin='normal' required fullWidth id='price' name='price' label='Price' type='number' />
        <TextField margin='normal' required fullWidth id='isbn' name='isbn' label='Isbn' type='text' />
        <TextField margin='normal' required fullWidth id='nbr_pages' name='nbr_pages' label='Nombre_pages' type='number' />
        <TextField margin='normal' required fullWidth id='imageURL' name='imageURL'  type='file' />
        <FormControlLabel control={<Checkbox value="agree" color="primary" name="tc" id="tc" />} label="I agree to term and condition." />
        <Box textAlign='center'>
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Add a book</Button>
        </Box>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
      </Box>
    </>;
  };
  
  export default CreateBook;
  