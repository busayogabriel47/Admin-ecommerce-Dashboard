
import './App.css'
import {Routes, Route} from "react-router-dom"
import Main from './Components/main';
import { Dashboard } from '@mui/icons-material';
import Products from './Pages/Products/Products';
import SingleProduct from './Pages/Products/SingleProduct';
import { ToastContainer} from 'react-toastify';
import Signin from './Pages/Auth/Signin';
import Signup from './Pages/Auth/Signup';
import { AuthProvider} from './Context/AuthContext';
import { ProductProvider } from './Context/ProductContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { EditProductProvider } from './Context/EditProductContext';
import { DeleteProductProvider } from './Context/DeleteProductContext';
import {CreateProductProvider} from "./Context/CreateProductContext";
import BrandList from './Pages/Brands/BrandList';
import { BrandsProvider } from './Context/GetBrandsContext';
import { DeleteBrandProvider } from './Context/DeleteBrandContext';
import { UpdateBrandProvider } from './Context/EditBrandContext';
import AddBrand from './Pages/Brands/AddBrand';
import AddProduct from './Pages/Products/AddProduct';
import { BrandProvider } from './Context/CreateBrand';
import AddCategory from './Pages/Categories/AddCategories';
import { CategoryProvider } from './Context/createCategories';
import { CategoriesProvider } from './Context/GetCategories';
import CategoryList from './Pages/Categories/CategoryLists';
import { UpdateCategoryProvider } from './Context/EditCategories';
import { DeleteCategoryProvider } from './Context/DeleteCategories';
import ColorList from './Pages/Colors/ColorList';
import CreateColorProvider from './Context/CreateColors';
import DeleteColorProvider from './Context/DeleColorContext';
import AddColor from './Pages/Colors/CreateColors';
import { ColorsProvider } from './Context/GetColorsContext';
import { EditColorProvider } from './Context/EditColorsContext';
import NotFound from './Pages/NotFound/NotFound';



function App() {

  return (
    <>
    <EditColorProvider>
    <ColorsProvider>
    <CreateColorProvider>
    <DeleteColorProvider>
    <DeleteCategoryProvider>
    <UpdateCategoryProvider>
    <CategoriesProvider>
    <CategoryProvider>
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
                <Route path="add-category" element={<AddCategory />} />
                <Route path="singlePro" element={<SingleProduct />} />
                <Route path="category-list" element={<CategoryList />} />
                <Route path='color-list' element={<ColorList/>}/>
                <Route path='color' element={<AddColor/>}/>
              </Route>
          </Route>

          <Route path='*' element={<NotFound/>}/>

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
    </CategoryProvider>
    </CategoriesProvider>
    </UpdateCategoryProvider>
    </DeleteCategoryProvider>
    </DeleteColorProvider>
    </CreateColorProvider>
    </ColorsProvider>
    </EditColorProvider>
    </>
  )
}

export default App
