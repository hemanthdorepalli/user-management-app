import React from 'react';
import UserTable from '../components/UserTable';
import useUsers from '../hooks/useUsers';

const Home = () => {
  const { users, loading, error } = useUsers();

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>User Management</h1>
      <UserTable users={users} />
    </div>
  );
};

export default Home;
