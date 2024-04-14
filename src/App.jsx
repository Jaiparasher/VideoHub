import React, { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import { useDispatch } from "react-redux";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<HomePage />}/>
                </Route>
                <Route path="/login" element={<Login />}/>
            </Routes>
            <Toaster
                position="top-right"
                reverseOrder={true}
                toastOptions={{
                    error: {
                        style: { borderRadius: "0", color: "red",},
                    },
                    success: {
                        style: { borderRadius: "0", color: "green" },
                    },
                    duration: 2000
                }}
            />
        </>
    );
}

export default App;
