import React, { useEffect, useState } from "react";
import axios from "axios";
import Edit from "../Edit/Edit";
import { Modal, Button } from "antd";
import Delete from "../Delete/Delete";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Delete
  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:4000/products/${productId}`)
      .then((response) => {
        console.log(`Deleted product with id ${response.data._id}`);
        setProducts(
          products.filter((product) => product._id !== response.data._id)
        );
      })
      .catch((error) => console.log(error));
  };

  //Edit
  const handleEdit = (updatedProduct) => {
    axios
      .put(
        `http://localhost:4000/products/${updatedProduct.id}`,
        updatedProduct
      )
      .then((response) => {
        setProducts(
          products.map((product) =>
            product._id === response.data._id ? response.data : product
          )
        );
      })
      .catch((error) => console.log(error));
  };

  //Api-den gelen
  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        setProducts(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        setLoaded(true);
      });
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (productId) => {
    setEditingProductId(productId);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (productId) => {
    setDeletingProductId(productId);
    setShowDeleteConfirmation(true);
    setIsModalOpen(true);
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
        <h2 className="text-2xl font-semibold leading-tight text-center">
          Products
        </h2>
      </div>
      {loaded && (
        <div className=" px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block max-w-full shadow rounded-lg overflow-hidden">
            <table className="max-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Categories
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Price
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Edit
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="border-b ">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      {product.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700   ">
                      {product.categories}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      {product.price}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      {" "}
                      <Button
                        onClick={() => handleEditClick(product._id)}
                        className="bg-sky-700 text-slate-50 hover:text-green-500 hover:bg-transparent"
                      >
                        Edit
                      </Button>
                      {editingProductId === product._id && (
                        <Modal
                          open={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          <Edit
                            product={product}
                            onConfirm={handleEditSubmit}
                            onCancel={() => setShowDeleteConfirmation(false)}
                          />
                        </Modal>
                      )}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      {" "}
                      <Button
                        onClick={() => handleDeleteClick(product._id)}
                        className="bg-red-700 text-slate-50 hover:text-green-500 hover:bg-transparent"
                      >
                        Delete
                      </Button>
                      {showDeleteConfirmation &&
                        deletingProductId === product._id && (
                          <Modal
                            title="Delete Items"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <Delete
                              onConfirm={handleDeleteConfirm}
                              onCancel={handleCancel}
                            />
                          </Modal>
                        )}
                    </td>
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

export default ProductTable;
