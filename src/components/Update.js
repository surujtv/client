import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";
export const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "Male",
    address: "",
  });

  useEffect(() => {
    getOne()
  }, []);

  const getOne = ()  => {
    axios.get(`http://localhost:4056/get-one/${id}`).then((response)=>{
        console.log(response);
        setFormData(response.data.record)
    }).catch((error)=>{
        console.log(error.message)
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4056/update/${id}`, FormData)
      .then((response) => {
        toast.success(response.data.message, { position: "top-center" });
        setFormData(response.data.record)
      })
      .catch((error) => {
        toast.error(error.message, { position: "top-center" });
      });
  };

  return (
    <>
      <div className="container">
        <h1>UPDATE USER DATA</h1>
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
            Update
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </Button>
        </Form>
      </div>
    </>
  );
};
