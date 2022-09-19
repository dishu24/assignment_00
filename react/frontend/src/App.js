import React from 'react'
import { Container } from 'react-bootstrap';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import {BrowserRouter as Router,Routes , Route} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';


function App() {
  return (
    <Router>
      <Header/>
      <main className="py-2">
        <Container>
          <Routes>
            <Route path='/' element={<HomePage/>} exact />
            <Route path='/product/:id' element={<ProductPage />}  />
            
            <Route path='/login' element={<LoginPage />}  />
            <Route path='/register' element={<RegisterPage />}  />
           

            
            <Route path='/admin/productlist' element={<ProductListPage/>} />
            <Route path='/admin/products/:id/edit' element={<ProductEditPage/>} />
            



          </Routes>  
        </Container>
      </main>
      <Footer/>
    </Router>

  );
}

export default App;
