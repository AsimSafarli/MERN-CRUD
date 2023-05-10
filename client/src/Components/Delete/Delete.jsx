import { Button, Modal } from 'antd';
import React, { useState } from 'react'

function Delete({ product, onConfirm, onCancel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div>
      <button onClick={onConfirm}>Delete</button>
          <button onClick={onCancel}>Cancel</button>
     
        </div>
  )
}

export default Delete
{/* <button onClick={handleDeleteConfirm}>Delete</button>
<button onClick={handleCancel}>Cancel</button> */}