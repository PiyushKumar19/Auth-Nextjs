"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';


export default  function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 8) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [user])

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      toast.success("Logged in successfully!");
      console.log(response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed from client side", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor='email'>Email: </label>
      <input type='email'
        className='p-2 border border-gray-300 text-black'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />
      <hr />
      <label htmlFor='password'>Password: </label>
      <input type='password'
        className='p-2 border border-gray-300 text-black'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />
      <hr />
      <button
        onClick={onLogin}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >{buttonDisabled ? "Fill details :|" : "Login"}</button>
      <Link href="/signup">Visit Signup page</Link>
    </div>
  )
}