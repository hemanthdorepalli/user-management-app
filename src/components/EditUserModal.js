import React, { useState } from 'react';
import { updateUser } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUserModal = ({ user, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [street, setStreet] = useState(user.address.street);
  const [city, setCity] = useState(user.address.city);
  const [companyName, setCompanyName] = useState(user.company.name);
  const [website, setWebsite] = useState(user.website);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name,
      email,
      phone,
      address: { street, city },
      company: { name: companyName },
      website,
    };

    try {
      await updateUser(user.id, updatedUser);
      toast.success('User updated successfully');
      onClose(); // Call onClose to trigger the parent state update
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  return (
    <div className="form-modal">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Phone:</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <label>Street:</label>
        <input value={street} onChange={(e) => setStreet(e.target.value)} required />

        <label>City:</label>
        <input value={city} onChange={(e) => setCity(e.target.value)} required />

        <label>Company Name:</label>
        <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

        <label>Website:</label>
        <input value={website} onChange={(e) => setWebsite(e.target.value)} />

        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditUserModal;
