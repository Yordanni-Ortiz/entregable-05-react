import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cart from "./Cart";
import {Cart4} from 'react-bootstrap-icons';
import Button from "react-bootstrap/Button";

import { useSelector } from "react-redux";

function NavBar() {
    const [launch, setLaunch] = useState(false);
    const isLogged = useSelector((state) => state.isLogged);

    const handleLaunch = (launch) => {
		setLaunch(launch);
	};

    return(
        <Navbar bg="light" expand="lg">
      <Container>
        <Cart
		sendLaunch={(launch) => handleLaunch(launch)}
		launch={launch}
		/>
        <div>
            <Navbar.Brand href="/">ECOMMERCE</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Products</Nav.Link>
            <Nav.Link href="/Purchases">Purchases</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              {!isLogged ? <NavDropdown.Item href="/Login">Login</NavDropdown.Item> : <NavDropdown.Item href="/LogOut">LogOut</NavDropdown.Item> }
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href=""><Button variant="warning" onClick={() => setLaunch(!launch)}>
					<Cart4 />
				</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
export default NavBar