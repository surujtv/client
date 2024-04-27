import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast';

export function Create() {
    const navigate = useNavigate();
    const [FormData, setFormData] = useState({
        name: "",
        email: "",
        mobile:"",
        gender: "Male",
        address: ""
    })

    const handleChange = (e) => {
      console.log(e.target)
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit=(event)=>{
        event.preventDefault()  // to stop page refresh

        // console.log(FormData)
        axios.post('http://localhost:4056/create', FormData)
        .then((response)=>{
            console.log(response.data)
            // alert(response.data.message);
            toast.success(response.data.message, {position: "top-center"}); //to show popUp
            
            navigate('/') //Render Home Page
        })
        .catch((error)=>{
            alert(error.message)
        })
    }

    return (
        <>
        <div className="container">
        <h1>ADD USER DATA</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              className="inpt"
              type="text"
              placeholder="Enter Name"
              name="name"
              value={FormData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              className="inpt"
              type="email"
              placeholder="Enter email"
              name="email"
              value={FormData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              className="inpt"
              type="number"
              placeholder="Enter Mobile"
              name="mobile"
              value={FormData.mobile}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              className="inpt"
              type="text"
              placeholder="Enter Address"
              name="address"
              value={FormData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Check
            inline
            label="Male"
            name="gender"
            type="radio"
            value="Male"
            onChange={handleChange}
            checked={FormData.gender === "Male"}
          />
          <Form.Check
            inline
            label="Female"
            name="gender"
            type="radio"
            value="Female"
            onChange={handleChange}
            checked={FormData.gender === "Female"}
          />
          <Form.Check
            inline
            label="Other"
            name="gender"
            type="radio"
            value="Other"
            onChange={handleChange}
            checked={FormData.gender === "Other"}
          />
          <br></br>
          <br></br>
          <Button variant="primary" type="submit" className="btn">
            Submit
          </Button>
          <Button variant="primary" type="submit" className="btn" onClick={()=>{
            navigate('/')
          }}>
            Back
          </Button>
        </Form>
        </div>
        </>
    )
}
