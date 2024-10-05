import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import { fetchUsers } from '../api';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleEditUser = (user) => setEditUser(user);
  const handleDeleteUser = (userId) => setDeleteUserId(userId);

  const fetchAllUsers = async () => {
    try {
      const userList = await fetchUsers();
      setUsers(userList);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleCloseDeleteModal = () => {
    fetchAllUsers();
    setDeleteUserId(null);
  };

  const handleUserUpdated = () => {
    fetchAllUsers();
    setEditUser(null);
  };

  return (
    <div>
      <button onClick={handleOpenForm}>Add New User</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && <UserForm onClose={handleCloseForm} addUser={addUser} />}
      {editUser && <EditUserModal user={editUser} onClose={handleUserUpdated} />}
      {deleteUserId && <DeleteUserModal userId={deleteUserId} onClose={handleCloseDeleteModal} />}
    </div>
  );
};

export default UserTable;
