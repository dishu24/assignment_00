import thunk from "redux-thunk";
import  {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'
import { combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductListReducer, ProductReducer,ProductCreateReducer,ProductReviewCreateReducer,ProductUpdateReducer,ProductDeleteReducer } from "./reducers/productReducer";
import { userLoginReducer, userRegisterReducer} from "./reducers/userReducer";


import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';


const reducers = combineReducers({
    productsList:ProductListReducer,
    productDetail:ProductReducer,
    
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
  
    ProductDelete:ProductDeleteReducer,
    ProductCreate:ProductCreateReducer,
    ProductUpdate:ProductUpdateReducer,
    
    ProductReviewCreate:ProductReviewCreateReducer,
    
})

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, reducers)

const userInfostorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null



const initialState = {

    userLogin: {userInfo : userInfostorage}, 
}

// //console.log('state',initialState);

const middleware = [thunk]

const store = configureStore({
    reducer:persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })},initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store

export const persistor = persistStore(store)