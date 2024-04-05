import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { UserData } from '../../model/userData';
import { addUser } from '../../service/user';

function AddUser() {
    const [userInfo, setUserInfo] = useState<UserData>({
      name: "",
        email: "",
         cin:  "",
      });
      const navigate = useNavigate();
      const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          [name]: value,
        }));
      };
      const handleSave = (event) => {
        event.preventDefault();
        addUser(userInfo)
        .then(resp=>{alert("user has been added succefully."),navigate('/users')})
                            .catch(err=>{console.log('err')})
                                  
        ;
        setUserInfo({
          name: '',
          email: '',
          cin: '',
        });
      }
      return (
        <div className="container-form">
          <div className="form-container">
            <Form onSubmit={handleSave}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={userInfo.name}
                  onChange={handleChange}
                required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Enter email"
                  value={userInfo.email}
                  onChange={handleChange}
                  required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Cin</Form.Label>
                <Form.Control
                  type="text"
                  name="cin"
                  placeholder="Enter cin"
                  value={userInfo.cin}
                  onChange={handleChange}
                  required/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit User
              </Button>
            </Form>
          </div>
        </div>
      );
}

export default AddUser;
