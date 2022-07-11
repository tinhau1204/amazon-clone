import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header/Header";
import Home from "./Home/Home";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Checkout from "./Checkout/Checkout";
import Login from "./Login/Login";
import {auth} from './firebase';
import { useStateValue } from "./StateProvider";

function App() {
    const [{},dispatch] = useStateValue();


    useEffect(() => {
        //will only run once when the app component loads...
        //it's like dynamic if statement
        auth.onAuthStateChanged(authUser => {
            console.log('this is User > : ',authUser);
    
            if (authUser){
                //the user just logged in/the user was logged in
                dispatch({
                    type: 'SET_USER',
                    user: authUser
                })
            }else {
                //the user is logged out
                dispatch({
                    type: 'SET_USER',
                    user: null
                })
            }
        })

    }, [])

    return ( 
        //use BEM convention
        <Router>
            <div className="app">
               <Header/> 
                <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>          
                    <Route path="/login" element={<Login/>}/>
                </Routes>
                </main>
            </div>
        </Router>

    );
}

export default App;