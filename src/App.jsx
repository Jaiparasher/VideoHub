import React, { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import {Login, SignUp} from "./components/index";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";
import MyChannel from "./pages/MyChannel/MyChannel";
import MyChannelVideos from "./pages/MyChannel/MyChannelVideos";
import History from "./pages/History";

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
                    <Route path="/my-content" element={<MyChannel />}>
                        <Route path="videos" element={<MyChannelVideos />}/>
                        <Route path="playlists" element={''}/>
                        <Route path="tweets" element={''}/>
                        <Route path="subscribed" element={''}/>
                    </Route>
                    <Route path="/history" element={<History />}/>
                </Route>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<SignUp />}/>
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
