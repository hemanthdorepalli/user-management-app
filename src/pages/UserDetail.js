import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>User Detail - ID: {id}</h2>
      {/* You can add more detail view logic here */}
    </div>
  );
};

export default UserDetail;
