import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'

import { useAuth } from '@/contexts/Auth'

function LayoutsNavbar() {
  const { show: { data: currentUser }, logout } = useAuth()

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/todos">Browse</Nav.Link>
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
