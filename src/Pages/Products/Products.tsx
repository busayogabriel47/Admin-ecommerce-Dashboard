import { useState } from "react"
import Search from "./Search"
import ProductContent from "./productContent"
import ProductList from "./productList"
import Productcount from "./productcount"

const Products = () => {

  const [isGridView, setIsGridView] = useState(false);

  return (
    <div>
        <Search/>
        <Productcount setIsGridView={setIsGridView} isGridView={isGridView}/>

        {isGridView ? <ProductContent/> : <ProductList/>}
        
        
    </div>
  )
}

export default Products