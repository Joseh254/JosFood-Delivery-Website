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
    

      const fetchUsers = async () => {
        if (userr.role==="admin"){
      try {
        const response = await axios.get('http://localhost:3000/api/users/users', { withCredentials: true });
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          setError(('an error occured'));
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
  }, [userr]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }

  return (
    <>
      <AdminHeader />
      <h2>Member of Jos food Delivery</h2>
      <div className="admin-users">
        
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className='userss'>

              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Role: {user.role}</p>
              <p> Email: {user.email}</p>
              
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
