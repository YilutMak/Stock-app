import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'

import { useAuth } from '@/contexts/Auth'

function LayoutsNavbar() {
  const { show: { data: currentUser }, logout } = useAuth()

  console.log(currentUser)

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Wall St stats</Navbar.Brand>

        <div className="input-group rounded" style={{ width: '250px' }}>
          <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search">icon</i>
          </span>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {
              currentUser ? (
                <>
                  <Nav.Link as={NavLink} to="/my/todos">My Todos</Nav.Link>
                  <Nav.Link as={NavLink} to="/my/todos/new">New Todo</Nav.Link>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/auth/login">Login</Nav.Link>
                  <Nav.Link as={NavLink} to="/auth/signup">Signup</Nav.Link>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default LayoutsNavbar
