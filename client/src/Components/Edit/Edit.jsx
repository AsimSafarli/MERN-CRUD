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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const initialValues = {
    name: "",
    categories: "",
    price: "",
  };
  return (
    <div className=" flex items-center justify-around">
      <Button className="btn-blue " onClick={showModal}>
        <div className="flex flex-row items-center justify-center">
          Edit<ion-icon name="create-outline"></ion-icon>
        </div>
      </Button>
      <Modal
        title="Edit"
        className="h-52"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Formik initialValues={initialValues}>
          <Form className="flex flex-col items-center justify-center mx-auto max-w-md px-6 py-12">
            <div className="flex-row-form">
              <label htmlFor="name">Name</label>
              <Field
                id="name"
                name="name"
                placeholder="Macbook"
                className="form-input"
                value={name} onChange={handleNameChange} 
              />
            </div>
            <div className="flex-row-form">
              <label htmlFor="categories">Categories</label>
              <Field
                id="categories"
                name="categories"
                placeholder="Apple"
                className="form-input"
                value={categories} onChange={handleCategoriesChange} 
              />
            </div>
            <div className="flex-row-form">
              <label htmlFor="price">Price</label>
              <Field
                id="price"
                name="price"
                placeholder="50m"
                className="form-input"
                value={price} onChange={handlePriceChange} 
              />
            </div>

            <button onClick={() => onConfirm({ id: product._id, name, categories, price })}>Save</button>
          <button onClick={onCancel}>Cancel</button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default Edit;
//ksolkmNxyurqXAjG
