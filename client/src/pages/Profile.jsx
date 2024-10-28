import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';

function Profile() {
  const [data, setData] = useState(null); // Initialize with null or an appropriate initial value
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Initialize with null or an appropriate initial value

  useEffect(() => {
    // Access local storage here and update state
    // const storedData = localStorage.getItem('user');
    // if (storedData) {
    //   setData(JSON.parse(storedData));
    // }
    const userObj = {
      ...user,
      is_connected: true
    }
    localStorage.setItem('user', JSON.stringify(userObj))
    window.location.href = "/uploads";
  }, []); // Empty dependency array to run the effect only once on component mount

  // Rest of your component code

  return (
    <div className='w-full h-screen'>
    </div>
  );
}

export default Profile;
