import React, { useEffect } from 'react'
import Product from '../components/Product'
import {Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ProductList } from '../actions/productAction'


import Loader from '../components/Loader'
import Message from '../components/Message'



const HomePage = () => {
    
    
    const dispatch = useDispatch()
    const productsList = useSelector((state) => state.productsList)
    const {error, loading, products} = productsList
    // console.log(products)
  
  
    


    useEffect( () => {
        dispatch(ProductList())
    },[dispatch])
    
  return (
    <div>

        
        <h1>Latest Product</h1>
        {loading ? <Loader/> 
         : error ? <Message variant='danger'>{error}</Message> 
          : (
            <div>
              <Row>
                {Array.isArray(products) ? products.map( (product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                  </Col>
                )) : null}
              </Row>
              
            </div>
          )}
        
    </div>
  )
}

export default HomePage