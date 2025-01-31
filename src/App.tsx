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
import {CreateProductProvider} from "./Context/CreateProductContext"
import BrandList from './Pages/Brands/BrandList';
import { BrandsProvider } from './Context/GetBrandsContext';
import { DeleteBrandProvider } from './Context/DeleteBrandContext';
import { UpdateBrandProvider } from './Context/EditBrandContext';
import AddBrand from './Pages/Brands/AddBrand';
import AddProduct from './Pages/Products/AddProduct';
import { BrandProvider } from './Context/CreateBrand';



function App() {

  return (
    <>
    <BrandProvider>
    <UpdateBrandProvider>
    <DeleteBrandProvider>
    <BrandsProvider>
    <CreateProductProvider>
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
                <Route path="add-product" element={<AddProduct />} />
                <Route path="add-brand" element={<AddBrand />} />
                <Route path="brand-list" element={<BrandList />} />
                <Route path="singlePro" element={<SingleProduct />} />
              </Route>
          </Route>

        </Routes>
    </AuthProvider>
    </ProductProvider>
    </EditProductProvider>
    </DeleteProductProvider>
    </CreateProductProvider>
    </BrandsProvider>
    </DeleteBrandProvider>
    </UpdateBrandProvider>
    </BrandProvider>
    </>
  )
}

export default App
