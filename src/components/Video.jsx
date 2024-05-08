import React from "react";

function Video({ src, poster }) {
    return (
        <>
            <video
                src={src}
                poster={poster}
                autoPlay
                controls
                playsInline
                className="sm:h-[68vh] w-full h-64 object-contain"
            ></video>
        </>
    );
}

export default Video;