import React, { useEffect, useState } from 'react'
import Delete from '../Delete/Delete';
import axios from 'axios';
import Edit from '../Edit/Edit';

function ProductTable() {
    const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);


  //Delete
  const handleDelete = (productId) => {
    axios.delete(`http://localhost:4000/products/${productId}`)
      .then(response => {
        console.log(`Deleted product with id ${response.data._id}`);
        setProducts(products.filter(product => product._id !== response.data._id));
      })
      .catch(error => console.log(error));
  };


  //Edit
  const handleEdit = (updatedProduct) => {
    axios.put(`http://localhost:4000/products/${updatedProduct.id}`, updatedProduct)
      .then(response => {
        setProducts(products.map(product => product._id === response.data._id ? response.data : product));
      }
   )
      .catch(error => console.log(error));
  };


  //Api-den gelen 
useEffect(() => {
  axios.get('http://localhost:4000/products')
    .then(response => {
      setProducts(response.data);
      setLoaded(true);
    })
    .catch(error => {
      console.error(error);
      setLoaded(true);
    });
}, []);


const handleEditClick = (productId) => {
  setEditingProductId(productId);
};

const handleDeleteClick = (productId) => {
  setDeletingProductId(productId);
  setShowDeleteConfirmation(true);
};

const handleDeleteConfirm = () => {
  handleDelete(deletingProductId);
  setShowDeleteConfirmation(false);
};

const handleEditSubmit = (updatedProduct) => {
  handleEdit(updatedProduct);
  setEditingProductId(null);
};
  return (
    <div className="py-8 flex flex-col gap-y-8">
     <div>
         <h2 className="text-2xl font-semibold leading-tight text-center">Products</h2>
     </div>
   {loaded && (
    <div className=" px-4 sm:px-8 py-4 overflow-x-auto">
    <div className="inline-block max-w-full shadow rounded-lg overflow-hidden">
        <table className="max-w-full leading-normal">
            <thead>
         <tr>
           <th >Name</th>
           <th >Categories</th>
           <th >Price</th>
           <th >Edit</th>
           <th>Delete</th>
         </tr>
       </thead>
       <tbody className="border-b ">
         {products.map(product => (
           <tr key={product._id} >
             <td className='w-48 flex items-center justify-center'>{product.name}</td>
             <td  className='w-48   '>{product.categories}</td>
             <td  className='w-48 flex items-center justify-center' >{product.price}</td>
             <td  className='w-48'> <button onClick={() => handleEditClick(product._id)}>Edit</button>
              {editingProductId === product._id && (
                <Edit product={product} onConfirm={handleEditSubmit} onCancel={() => setShowDeleteConfirmation(false)} />
              )}</td>
             <td  className='w-48 flex items-center justify-center'> <button onClick={() => handleDeleteClick(product._id)}>Delete</button>
              {showDeleteConfirmation && deletingProductId === product._id && (
                <Delete
                  product={product}
                  onConfirm={handleDeleteConfirm}
                  onCancel={() => setShowDeleteConfirmation(false)}
                />
              )}</td>
           </tr>
         ))}
       </tbody>
     </table>
     </div>
     </div>
   )}
 </div>
);
}

export default ProductTable
