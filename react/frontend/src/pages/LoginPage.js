import FormContainer from '../components/FormContainer'
import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button ,Col, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import { loginAction } from '../actions/userAction'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const search = useLocation().search;
    const redirect = new URLSearchParams(search).get('redirect') ? new URLSearchParams(search).get('redirect') : '/'

    const user = useSelector((state) => state.userLogin)
    const {error, loading, userInfo} = user

    useEffect( () => {
      if(userInfo){
        navigate(redirect)
      }
      
    },[navigate,userInfo,redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(loginAction(email, password))
    }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>username:</Form.Label>
            <Form.Control type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}>

            </Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' placeholder='Enter your password..' value={password} onChange={(e) => setPassword(e.target.value)}>
                
            </Form.Control>
        </Form.Group>
        <br></br>

        <Button type='submit' variant='primary'>Sign In</Button>
      </Form>
      <Row className='py-3'>
        <Col>
            New User? <Link to='/register'>Sign up</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginPage