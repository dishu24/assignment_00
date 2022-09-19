import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import {NavDropdown} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { logoutAction } from '../actions/userAction';
import { useNavigate } from 'react-router';


const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userdetail = useSelector(state => state.userLogin)
    const {userInfo} = userdetail


    const logoutHandler = () => {
        dispatch(logoutAction())
        navigate('/login')
    }
  return (
    <div >
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand >Demo</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav  id='navbar'>
                        
                        {userInfo ? (
                            <NavDropdown title={userInfo.email} id='username'>
                               
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                
                            </NavDropdown>
                            
                        ) : (
                            <>
                                <LinkContainer to="/login">
                                    <Nav.Link >Login</Nav.Link>
                                </LinkContainer>

                            </>
                            
                        )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    

                                </NavDropdown>
                            )}  
                
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default Header