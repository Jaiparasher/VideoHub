import React from "react";
import { useNavigate } from "react-router-dom";

function Avatar({ src, channelName ,size=8 }) {
    const navigate = useNavigate();

    const handleAvatarClick = (e) => {
        e.stopPropagation()
        navigate(`/channel/${channelName}`);
    };
    return (
        <>
            <img
                src={src}
                alt="avatar"
                className={`w-${size} h-${size} rounded-full object-cover`}
                onClick={handleAvatarClick}
            />
        </>
    );
}

export default Avatar;