import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useParams , useNavigate} from 'react-router'
import { ProductDetail , UpdateProductAction} from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstant'
import axios from 'axios'

const ProductEditPage = () => {
    // debugger;
    const {id} = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [inStock, setInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productDetail = useSelector((state) => state.productDetail)
    // //console.log(productDetail)
    const {loading, error, product } = productDetail

    const ProductUpdate = useSelector((state) => state.ProductUpdate)
    // //console.log(productDetail)
    const {loading:loadingupdate, error:errorupdate, success:successupdate } = ProductUpdate

    useEffect( () => {
        if(successupdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        }
        if(!product.name || product._id !== Number(id)){
            dispatch(ProductDetail(id))
        }else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setInStock(product.inStock)
            setDescription(product.description)
        }
    },[product,navigate,dispatch,id,successupdate])

    // const userinfo = useSelector(state => state.userLogin)
    // const {userInfo} = userinfo

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(UpdateProductAction({
            _id:id,
            name,
            price,
            image,
            brand,
            category,
            inStock,
            description
        }))

    }

    const uploadFileHandler = async (e) => {
        
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload/image/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }
  return (
    <div>
        <Link to='/admin/productlist'>Go Back</Link>
        <FormContainer>

            <h1>Edit Product</h1>
            {loadingupdate && <Loader/>}
            {errorupdate && <Message variant='danger'>{errorupdate}</Message>}

            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>

                    <Form.Label>Name:</Form.Label>
                    <Form.Control type='text' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>

                    <Form.Label>Price:</Form.Label>
                    <Form.Control type='number'  placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>

                    <Form.Label>Image:</Form.Label>
                    <Form.Control type='text' placeholder='image' value={image } onChange={(e) => setImage(e.target.value)}>

                    </Form.Control>
                    <Form.Control type='file' label='Choose File' custom='true' onChange={uploadFileHandler}></Form.Control>
                    {uploading && <Loader />}
                </Form.Group>
                <Form.Group controlId='brand'>

                    <Form.Label>Brand:</Form.Label>
                    <Form.Control type='text' placeholder='Enter Brand' value={brand } onChange={(e) => setBrand(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='category'>

                    <Form.Label>Category:</Form.Label>
                    <Form.Control type='text' placeholder='Enter category' value={category } onChange={(e) => setCategory(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>

                    <Form.Label>Description:</Form.Label>
                    <Form.Control type='text' placeholder='Enter description' value={description } onChange={(e) => setDescription(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='inStock'>

                    <Form.Label>In Stock:</Form.Label>
                    <Form.Control type='number' placeholder='Enter instock' value={inStock } onChange={(e) => setInStock(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                
                
                <br></br>

                <Button type='submit' variant='primary'>Update</Button>
            </Form>
        </FormContainer>
    </div>
  )
}

export default ProductEditPage