import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header/Header";
import Home from "./Home/Home";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Checkout from "./Checkout/Checkout";
import Login from "./Login/Login";
import {auth} from './firebase';
import { useStateValue } from "./StateProvider";
import Payment from "./Payment/Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from "./Orders/Orders";

function App() {
    const [{},dispatch] = useStateValue();
    const promise = 
    loadStripe('pk_test_51LKzppCxNWrzChOdIl7BOy4pxL9nD46AUUopXKPMig7vUzud0bYCuxElgQenYOa7n5QT1Ej8HdEDH6RJel7oZw3i00L6PXwM95');

    useEffect(() => {
        //will only run once when the app component loads...
        //it's like dynamic if statement
        auth.onAuthStateChanged(authUser => {
            console.log('this is User > : ',authUser);
    
            if (authUser){
                //the user just logged in/the user was logged in
                dispatch ({
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
                    <Route path="/payment" element={
                        <Elements stripe={promise}>
                           <Payment/>
                        </Elements>
                    }/>
                    <Route path="/orders" element={<Orders/>}/>
                </Routes>
                </main>
            </div>
        </Router>

    );
}

export default App;