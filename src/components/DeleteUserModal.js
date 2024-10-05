import React, { useState } from 'react';
import { deleteUser } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteUserModal = ({ userId, onClose, onUserDeleted }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteUser(userId);
      toast.success('User deleted successfully');
      onUserDeleted(); // Optional: Notify parent component after successful deletion
      onClose();
    } catch (error) {
      toast.error('Failed to delete user');
      setIsLoading(false);
    }
  };

  return (
    <div className="delete-modal">
      <p>Are you sure you want to delete this user?</p>
      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? 'Deleting...' : 'Yes'}
      </button>
      <button onClick={onClose} disabled={isLoading}>
        No
      </button>
      <ToastContainer />
    </div>
  );
};

export default DeleteUserModal;
