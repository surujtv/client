import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";

export function Home() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserList();
  }, [status]);

  const getUserList = () => {
    axios
      .get("http://localhost:4056/get")
      .then((response) => {
        console.log(response.data.record);
        setUsers(response.data.record);
        setStatus(response.data.success);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDelete = (id) => {
    // console.log(id);
    axios
      .delete(`http://localhost:4056/delete/${id}`)
      .then((response) => {
        getUserList();
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="container">
      <Button
        onClick={() => {
          navigate("/create");
        }}
      >
        Add New User
      </Button>
      <h1>USER LIST</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Address</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {status
            ? users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.gender}</td>
                  <td>{user.address}</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(user._id)}
                      style={{
                        fontSize: "20px",
                        backgroundColor: "green",
                        color: "white",
                        border: "0px solid red",
                        borderRadius: 10,
                        padding: 10,
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user._id)}
                      style={{
                        fontSize: "20px",
                        backgroundColor: "red",
                        color: "white",
                        border: "0px solid red",
                        borderRadius: 10,
                        padding: 10,
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
