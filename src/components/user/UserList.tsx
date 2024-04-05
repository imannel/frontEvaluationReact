import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { deleteUserById, getUsers, searchUsers } from "../../service/user";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserData } from "../../model/userData";
import { faEdit, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';



function UserList() {
  const [users, setUsers] = useState<UserData[]>([]);

  const [query, setQuery] = useState("");

  useEffect(() => {
    handleGetUsers();
  }, []);
  const navigate=useNavigate();
  const handleGetUsers = () => {
    getUsers()
      .then(resp => {
        const users = resp.data;
        setUsers(users);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleDeleteRoom = (id: number) => {
    alert('Are you sure?')
    deleteUserById(id)
      .then(resp => {
        const newRooms = users.filter(item => item.id !== id);
        setUsers(newRooms);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    searchUsers(query)
      .then((resp) => {
        const searchedUsers = resp.data;
        setUsers(searchedUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Container className="my-4">
    <h1 className="user-title mb-4">Users</h1>
    <Row>
      <Col md={6}>
        <Form onSubmit={handleSearch}>
          <Row>
            <Col>
              <Form.Control
                type="text"
                value={query}
                name="search"
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: "100%" }}
              />
            </Col>
            <Col>
            <Button type="submit" variant="primary">
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
            </Button>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col md={6} className="d-flex justify-content-end align-items-center">
    <Link to="addForm">
      <Button variant="success" size="lg">
         <FontAwesomeIcon icon={faPlus} className="mr-2" />
            New
         </Button>
    </Link>

      </Col>
    </Row>
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Cin</th>
          <th>delete</th>
          <th>Show book library</th>
        </tr>
      </thead>
      <tbody>
  {Array.isArray(users) && users.map(user => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.cin}</td>
      <td>
        <Button variant="danger" onClick={() => handleDeleteRoom(user.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
      <td>
    <Button variant="primary" size="lg"  onClick={() => navigate(`/user-details-page/${user.id}`)}>
    <FontAwesomeIcon icon={faBook} className="mr-2" />

    </Button>
      </td>
      
    </tr>
  ))}
</tbody>

    </Table>
  </Container>
);
  
}

export default UserList