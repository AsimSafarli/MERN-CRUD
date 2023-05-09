import React from 'react'
import Add from '../Add/Add'
import ProductTable from '../Table/ProductTable'

function Product() {
  return (
    <div>
        <div className='flex flex-row justify-center items-center'>
       <ProductTable/>
        </div>
      <Add/>
    </div>
  )
}

export default Product
