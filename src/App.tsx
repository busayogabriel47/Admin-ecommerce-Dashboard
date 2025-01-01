import { useState } from 'react';
import './App.css'
import {Routes, Route} from "react-router-dom"
import Main from './Components/main';
import { Dashboard } from '@mui/icons-material';
import Products from './Pages/Products/Products';
import SingleProduct from './Pages/Products/SingleProduct';
import { ToastContainer, toast } from 'react-toastify';
import Signin from './Pages/Auth/Signin';
import Signup from './Pages/Auth/Signup';
import { AuthProvider} from './Context/AuthContext'
import { ProductProvider } from './Context/ProductContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { EditProductProvider } from './Context/EditProductContext';
import { DeleteProductProvider } from './Context/DeleteProductContext';



function App() {

  return (
    <>
    <DeleteProductProvider>
    <EditProductProvider>
    <ProductProvider>
    <ToastContainer/>
    <AuthProvider>
      <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>


              {/* Routes with the dashboard layout */}
          
          <Route element={<ProtectedRoute/>}>
              <Route path="/" element={<Main />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="singlePro" element={<SingleProduct />} />
              </Route>
          </Route>

        </Routes>
    </AuthProvider>
    </ProductProvider>
    </EditProductProvider>
    </DeleteProductProvider>
    </>
  )
}

export default App
