import { 
    PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, 
    PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL,
    PRODUCT_FAIL, PRODUCT_SUCCESS, PRODUCT_REQUEST,
    PRODUCT_DELETE_FAIL,PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,PRODUCT_CREATE_REVIEW_REQUEST,PRODUCT_CREATE_REVIEW_SUCCESS,
    
} from "../constants/productConstant"
import axios from "axios"


export const ProductList = () => async (dispatch) => {
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} = await axios.get('/api/')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload : data
        })

    }catch (error) {
        dispatch({
            type : PRODUCT_LIST_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



export const ProductDetail = (id) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_REQUEST})
        const {data} = await axios.get(`/api/${id}/`)
        dispatch({
            type: PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type : PRODUCT_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const ProductDelete = (id) => async (dispatch,getState) => {
    try{
        dispatch({type: PRODUCT_DELETE_REQUEST})
        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(`/api/delete/${id}/`,config)
        
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            
        })
    } catch (error) {
        dispatch({
            type : PRODUCT_DELETE_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const CreateProductAction = () => async (dispatch,getState) => {
    try{
        dispatch({type: PRODUCT_CREATE_REQUEST})
        const {userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/create/product/`,{},config)
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
            
        })
    } catch (error) {
        dispatch({
            type : PRODUCT_CREATE_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const UpdateProductAction = (product) => async (dispatch,getState) => {
    try{
        dispatch({type: PRODUCT_UPDATE_REQUEST})
        const {userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/productupdate/${product._id}/`,product,config)
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
            
        })

        dispatch({
            type:PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type : PRODUCT_UPDATE_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const createProductReviewAction = (productId, review) => async (dispatch,getState) => {
    try{
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST})
        const {userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/${productId}/review/`,review,config)
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data
            
        })

    } catch (error) {
        dispatch({
            type : PRODUCT_CREATE_REVIEW_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}