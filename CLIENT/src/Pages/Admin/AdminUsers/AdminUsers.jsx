import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminUsers.css';
import AdminHeader from '../../../Components/AdminHeader/AdminHeader';
import useUserStore from '../../../../Store/UserStore';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userr = useUserStore((state)=>state.user)

  useEffect(() => {
    if (userr.role==="admin"){

          const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/users', { withCredentials: true });
        console.log(response.data.data); // Log the response data to inspect its structure
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          setError(('Expected an array of users'));
        }
      } catch (error) {
        setError(error);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }

  return (
    <>
      <AdminHeader />
      <div className="admin-users">
        <h2>User List</h2>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))
        ) : (
          <div>No users available</div>
        )}
      </div>
    </>
  );
}

export default AdminUsers;
