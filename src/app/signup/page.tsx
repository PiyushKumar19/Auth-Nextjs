'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import mongoose from 'mongoose';


export default function SignUp() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(user.email.length > 0 && user.password.length >= 8 && user.username.length > 0) {
      console.log(user);
      setbuttonDisabled(false);
    }  else {
      setbuttonDisabled(true);
    }

  } ,[user]);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);

      toast.success('Congratulations! You have signed up successfully');
      setTimeout(()=>{router.push("/login")},2500);
      
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor='username'>Username: </label>
      <input type='text'
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='username'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='username'
      />
      <label htmlFor='email'>Email: </label>
      <input type='email'
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />
      <label htmlFor='password'>Password: </label>
      <input type='password'
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />
      <button
        onClick={onSignUp}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >{buttonDisabled ? "Fill details :|" : "Signup"}</button>
      <Link href="/login">Visit login page</Link>
    </div>
  )
}