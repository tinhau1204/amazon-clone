import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Login.css';
function Login() {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const signIn = e => {
    e.preventDefault();
    //do something with firebase
    auth
      .signInWithEmailAndPassword(email,password)
      .then((auth) =>{
        navigate('/');
        alert('Welcome to our amazon clone website ✴✔');
      })
      .catch(error => alert(error.message));
    }

  const register = e => {
    e.preventDefault();
    //do something with firebase
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((auth) =>{
      //it successfully created a new user with email and password
      console.log(auth);
      if (auth) {
        alert('register successfully ✔');
        navigate('/');
      }
    })
    .catch(error => alert(error.message));
  }

  return (
    <div className='login'>
      <Link to='/'>
      <img 
      className='login__logo'
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png " 
      alt="login icon"/>
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>Email</h5>
          <input 
          type="text" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required/>
          <h5>Password</h5>
          <input 
          type='password' 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required/>
          <button 
          className='login__signInButton'
          onClick={signIn}>Sign In</button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE 
          Conditions of Use &amp; Sale. Please see our Privacy Notice, 
          our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        <button 
        className='login__registerButton'
        onClick={register}>
        
          Create your Amazon Account
        </button>
      </div>
    </div>
  )
}

export default Login