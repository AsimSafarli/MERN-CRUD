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
        <Button onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <button onClick={onConfirm}>Delete</button>
          <button onClick={onCancel}>Cancel</button>
      </Modal>
        </div>
  )
}

export default Delete
  