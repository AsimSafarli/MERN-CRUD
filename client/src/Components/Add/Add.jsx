import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Field, Form, Formik } from "formik";
import axios from "axios";
function Add() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAdd = async (initialValues) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/product",
        initialValues
      );
      if (response.data.success) {
        alert("Product created successfully");
        initialValues.name = '';
      initialValues.categories = '';
      initialValues.price = '';
      } else {
        alert("Product created failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    name: "",
    categories: "",
    price: "",
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

  return (
    <div className=" flex items-center justify-center">
      <Button className="btn-emerald w-1/2" onClick={showModal}>
        <div className="flex flex-row items-center justify-center">
          Add<ion-icon name="add-outline"></ion-icon>
        </div>
      </Button>
      <Modal
        title="ADD"
        className="h-52"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Formik initialValues={initialValues} onSubmit={handleAdd}>
          {({ values, handleChange, handleSubmit }) => (
            <form
              className="flex flex-col items-center justify-center mx-auto max-w-md px-6 py-12"
              onSubmit={handleSubmit}
            >
              <div className="flex-row-form">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Macbook"
                  className="bg-slate-50"

                />
              </div>
              <div className="flex-row-form">
                <label htmlFor="categories">Categories</label>
                <input
                  id="categories"
                  name="categories"
                  type="text"
                  value={values.categories}
                  onChange={handleChange}
                  placeholder="Apple"
                  className="form-input"
                />
              </div>
              <div className="flex-row-form">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={values.price}
                  onChange={handleChange}
                  placeholder="50m"
                  className="form-input"
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}

export default Add;
