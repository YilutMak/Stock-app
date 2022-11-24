import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import Searchbar from '@/components/searchbar'
import { useAuth } from '@/contexts/Auth'

function LayoutsNavbar() {
  const { show: { data: currentUser }, logout } = useAuth()

  // console.log(currentUser)

  return (
    <Navbar className="d-flex justify-content-between" id="navbar" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/"><div id="wallst" /></Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse style={{}}>
          <Nav className="mx-auto">
            {
              currentUser ? (
                <>
                  <div id="searchbarContainer" className="d-flex justify-content-center">
                    <Searchbar />
                  </div>
                  <Nav.Link id="navComponent" className="text-light d-flex justify-content-end" style={{ }} as={NavLink} to="/my/stocks">Welcome {currentUser.username}</Nav.Link>
                  <Nav.Link className="ml-6 text-light" onClick={logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <div id="searchbarContainer" className="d-flex justify-content-center">
                    <Searchbar />
                  </div>
                  <Nav.Link id="navComponent" className="mr-auto text-light" as={NavLink} to="/auth/login">Login</Nav.Link>
                  <Nav.Link id="navComponent" className="text-light" as={NavLink} to="/auth/signup">Signup</Nav.Link>
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
