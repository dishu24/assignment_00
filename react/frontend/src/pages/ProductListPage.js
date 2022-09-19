import React, { useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button ,Table,Row,Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {ProductDelete, ProductList, CreateProductAction} from '../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'




const ProductListPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const productsList = useSelector(state => state.productsList)
    const {loading, error, products, page, pages} = productsList

    const productdelete = useSelector(state => state.ProductDelete)
    const {success:successdelete, error:errordelete, loading:loadingdelete} = productdelete

    const productcreate = useSelector(state => state.ProductCreate)
    const {success:successcreate,product:createdproduct, error:errorcreate, loading:loadingcreate} = productcreate
    //console.log(createdproduct)

    const userinfo = useSelector(state => state.userLogin)
    const {userInfo} = userinfo

    let keyword = location.search

    useEffect( () => {
        dispatch({type:PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin){
            
            navigate('/login')
        }
        
        if(successcreate){
            navigate(`/admin/products/${createdproduct._id}/edit`)
        }else{
            dispatch(ProductList(keyword))
        }
    },[dispatch,navigate,userInfo, successdelete, successcreate, createdproduct, keyword])

    const deleteHandler = (id) => {
        dispatch(ProductDelete(id))
        navigate('/admin/productlist')
    }
    const createproducthandler = () =>{
        dispatch(CreateProductAction())
    }
  return (
    <div>
      <Row className='align-items-center'>
        <Col><h2>Products</h2></Col>
        <Col className='text-right'>
            <Button className='my-3' onClick={createproducthandler}>
                <i className='fas fa-plus'></i> Create Product
            </Button>
        </Col>
      </Row>
      {loadingdelete && <Loader/>}
      {errordelete && <Message variant='danger'>{errordelete}</Message>}
      
      {loadingcreate && <Loader/>}
      {errorcreate && <Message variant='danger'>{errorcreate}</Message>}
      {loading ? <Loader/> : error ? (<Message variant='danger'>{error}</Message>)
        : (
            <div>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Price</th>
                            
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(products) ? products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>Rs. {product.price}</td>

                                <td>
                                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        )) : null}
                    </tbody>
                </Table>
                
            </div>
        )}
    </div>
  )
}

export default ProductListPage