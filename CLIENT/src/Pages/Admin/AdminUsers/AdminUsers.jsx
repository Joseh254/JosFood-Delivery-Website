import React from 'react'
import axios from 'axios'
import './AdminUsers.css'
 async function AdminUsers() {
  const response = await axios.get('http://localhost:3000/api/users/users')
  console.log(response);
  return (
    <div>AdminUsers</div>
  )
}
 
export default AdminUsers