import React from 'react'
import Login from "./components/Login"
import Signup from "./components/Signup"
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function App()
{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </Router>
    )
}