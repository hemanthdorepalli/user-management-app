import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserForm.css';

const UserForm = ({ onClose, onUserAdded }) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        toast.error('Failed to fetch users');
      }
    };
    loadUsers();
  }, []);

  const getNextId = () => {
    return users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validateWebsite = (website) => website.length === 0 || /^(https?:\/\/)?([a-z0-9]+[.])+[a-z]{2,}([/?].*)?$/.test(website);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs (same as your code)

    const newUser = {
      id: getNextId(),
      name,
      email,
      phone,
      username: `USER-${name.toLowerCase()}`,
      address: { street, city },
      company: { name: companyName },
      website,
    };

    try {
      const createdUser = await createUser(newUser);
      toast.success('User created successfully');
      setUsers(prevUsers => [...prevUsers, createdUser]); // Update local state
      onUserAdded(createdUser);  // Notify UserTable about the new user
      onClose();
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  return (
    <div className="form-modal">
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

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

        <label>Username:</label>
        <input value={`USER-${name.toLowerCase()}`} disabled />
        
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserForm;
