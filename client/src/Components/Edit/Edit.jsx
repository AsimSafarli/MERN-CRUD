import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Field, Form, Formik } from "formik";
function Edit({ product,onConfirm,onCancel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(product.name);
  const [categories, setCategories] = useState(product.categories);
  const [price, setPrice] = useState(product.price);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCategoriesChange = (e) => {
    setCategories(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const initialValues = {
    name: "",
    categories: "",
    price: "",
  };
  return (
    <div className=" flex items-center justify-around">
        <Formik initialValues={initialValues}>
          <Form className="flex flex-col gap-y-5 items-center justify-center mx-auto max-w-md px-6 py-12">
            <div className="flex-row-form">
              <label htmlFor="name" className="font-bold text-lg text-black">Name</label>
              <Field
                id="name"
                name="name"
                placeholder="Macbook"
                className="form-input"
                value={name} onChange={handleNameChange} 
              />
            </div>
            <div className="flex-row-form">
              <label htmlFor="categories" className="font-bold text-lg text-black">Categories</label>
              <Field
                id="categories"
                name="categories"
                placeholder="Apple"
                className="form-input"
                value={categories} onChange={handleCategoriesChange} 
              />
            </div>
            <div className="flex-row-form">
              <label htmlFor="price" className="font-bold text-lg text-black">Price</label>
              <Field
                id="price"
                name="price"
                placeholder="50m"
                className="form-input"
                value={price} onChange={handlePriceChange} 
              />
            </div>
            <div className="flex flex-row gap-x-5">
            <button onClick={() => onConfirm({ id: product._id, name, categories, price })} className="bg-green-700 text-slate-50 hover:bg-transparent hover:text-green-700 w-40 h-8 hover:border-green-700 hover:border-solid">Save</button>
          <button onClick={onCancel} className="bg-red-700 text-slate-50 hover:bg-transparent hover:text-red-700 w-40 h-8 hover:border-red-700 hover:border-solid">Cancel</button>
            </div>
           
          </Form>
        </Formik>
    </div>
  );
}

export default Edit;
//ksolkmNxyurqXAjG
