import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card , Form} from 'react-bootstrap'
import Rating from '../components/Rating'

import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createProductReviewAction, ProductDetail } from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstant'

const ProductPage = () => {
    const {id} = useParams()
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    //console.log(id)
    const dispatch = useDispatch()
    
    // debugger;
    const productDetail = useSelector((state) => state.productDetail)
    //console.log(productDetail)
    const {loading, error, product } = productDetail

    const productreviewcreate = useSelector(state => state.ProductReviewCreate)
    const {loading:createreviewloading, error:createreviewerror, success:createreviewsuccess } = productreviewcreate
    //console.log('review',productreviewcreate)
    // const {name}= product
    // //console.log('product',product)
    const userinfo = useSelector(state => state.userLogin)
    const {userInfo} = userinfo

    
         
    useEffect( () => {
        if(createreviewsuccess){
            setRating(0)
            setComment('')
            //console.log('success')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(ProductDetail(id))
        
    }, [dispatch,id, createreviewsuccess])

    
    
    const submitHandler = (e) => {
        // debugger;
        e.preventDefault()
        dispatch(createProductReviewAction(
            id,{
            rating,
            comment}
        ))
    }
  return (
    
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {loading ? <Loader/> : 
        error ? <Message variant='danger'>{error}</Message>  :
        (
            <div>
                <Row>
           
            
                    <Col md={6}>
                        <Image style={{'height':'350px','width':'500px','marginBottom':'8%'}} src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            {/* <ListGroup.Item><h3 id="prd">{product.name}</h3></ListGroup.Item> */}
                            <ListGroup.Item><h2 id="prd">{product.name}</h2></ListGroup.Item>

                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numreviews} reviews`} color={'#f8e825'} />
                            </ListGroup.Item>
                            <ListGroup.Item>Price: Rs.{product.price}</ListGroup.Item>
                            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>Rs. {product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.inStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                    </Row>
                                </ListGroup.Item>
                                
                                {product.inStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty:</Col>
                                            <Col xs='auto' className='my-1'>
                                                <Form.Select size='sm' as='select' value={quantity}
                                                    onChange={ (e) => setQuantity(e.target.value) } 
                                                >
                                                    
                                                    {
                                                        [...Array(product.inStock).keys()].map((x) => (
                                                            <option key={x+1} value={x+1} >
                                                                {x+1}
                                                            </option>
                                                            
                                                        ))
                                                    }

                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <h4>Reviews</h4>
                        {product.reviews.length === 0 && <Message variant='info'>No reviews</Message>}

                        <ListGroup variant='flush'>
                            <hr></hr>
                            {product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} color='#f8e825'/>
                                    <p>{review.created_at.substring(0,10)}</p>
                                    <p>{review.comment}</p>

                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item>
                                <h6>Write a review</h6>
                                {createreviewloading && <Loader/>}
                                {createreviewsuccess && <Message variant='success'>Review submitted</Message>}
                                {createreviewerror && <Message variant='danger'>already review</Message>}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating :</Form.Label>
                                            <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        
                                        <Form.Group controlId='comment'>
                                            <Form.Label><h6>Review :</h6></Form.Label>
                                            <Form.Control as='textarea' row='2' value={comment} onChange={(e) => setComment(e.target.value)}>

                                            </Form.Control>
                                        </Form.Group>
                                        <Button size='sm' className='mt-1' type='submit' variant='primary' disabled={createreviewloading}>Submit</Button>
                                    </Form>
                                ) : (
                                    <Message variant='info'>Please <Link to='/login'>Login</Link> to write a review</Message>
                                )}
                            </ListGroup.Item>
                                                    
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        )
        
        
        } 
    </div>
  )
}

export default ProductPage