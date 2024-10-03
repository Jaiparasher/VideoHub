import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../store/Slices/likeSlice";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { Container, NoVideosFound, VideoList } from "../components";
import { makeVideosNull } from "../store/Slices/videoSlice";

function LikedVideos() {
    
    const likedVideos = useSelector((state) => state.like?.likedVideos);
    const loading = useSelector((state) => state.like.loading);

    const dispatch = useDispatch();
    window.scrollTo(0, 0);

    useEffect(() => {
        dispatch(getLikedVideos());
        
    }, [dispatch]);

    if (loading) {
        return <HomeSkeleton />;
    }
    if (likedVideos?.length == 0) {
        return <NoVideosFound />;
    }

    return (
        <>
           <Container>
                <div className="grid max-h-screen overflow-y-scroll lg:grid-cols-3 sm:grid-cols-2 text-white mb-20 sm:mb-0">
                    {likedVideos?.map((video) => (
                        <VideoList
                            key={video._id}
                            avatar={video.video?.ownerDetails?.avatar?.url}
                            duration={video.video?.duration}
                            title={video.video?.title}
                            thumbnail={video.video?.thumbnail?.url}
                            createdAt={video.video?.createdAt}
                            views={video.video?.views}
                            channelName={video.video?.ownerDetails?.username}
                            videoId={video.video?._id}
                        />
                    ))}
                </div>
            </Container>
        </>
    );
}

export default LikedVideos;