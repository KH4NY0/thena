'use client'

import useAuth from "@/context/useAuth";
import React from "react";
import Login from "@/components/Login"

const Dashboard = () => {
    const {authStatus} = useAuth();
    return (
        <h1>Dashboard</h1>
    );
}

export default Dashboard;