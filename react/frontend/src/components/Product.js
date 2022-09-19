import React from 'react'
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
    
  return (
    <Card className="my-3 p-3 rounded cardmain">
        <Link to={`/product/${product._id}`}>
            <Card.Img id='card-img' src={product.image} />
        </Link>

        <Card.Body>
        <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
                <strong><b>{product.name}</b></strong>
            </Card.Title>
        </Link>
        <Card.Text as="div">
            <div className="my-2">
                 
                <Rating value={product.rating} text={`${product.numreviews} reviews`} color={'#f8e825'} />
            </div>
        </Card.Text>
        <Card.Text as="h3">
            Rs. {product.price}
        </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product