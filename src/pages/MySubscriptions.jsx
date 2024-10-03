import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannels } from "../store/Slices/subscriptionSlice";
import { Link } from "react-router-dom";
import { VideoList, Avatar } from "../components";

function MySubscriptions() {
    const dispatch = useDispatch();
    const subscriptions = useSelector(
        (state) => state.subscription?.mySubscriptions
    );
    const subscriberId = useSelector((state) => state.auth?.userData?.data?._id);
    useEffect(() => {
        if (subscriptions) {
            dispatch(getSubscribedChannels(subscriberId));
        }
    }, [dispatch, subscriberId]);
    window.scrollTo(0, 0);

    return (
        <>
            <div className="flex gap-2 p-2 flex-col text-white items-center ">
                <div className="bg-[#222222] flex justify-start items-center p-4  w-full h-20 border border-[#fd7014]">
                    <h1 className="text-xl font-bold ">My Subscriptions</h1>
                </div>
                {subscriptions?.map((subscription) => (
                    
                    <div
                        key={subscription?.subscribedTo?._id}
                        className="flex gap-2 items-center w-full overflow-x-scroll justify-start"
                    >
                        <Avatar
                            src={subscription?.subscribedTo?.avatar.url}
                            channelName={
                                subscription?.subscribedTo?.username
                            }
                            size={16}
                        />
                        <h5 className="text-2xl">
                            {subscription?.subscribedTo?.username}
                        </h5>
                    </div>
                ))}
            </div>

            <div className="text-white mb-20 sm:mb-0 w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll">
                {subscriptions?.map((subscription) => (
                    <Link
                        to={`/watch/${subscription?.subscribedChannel?.latestVideo?._id}`}
                        key={subscription?.subscribedChannel?._id}
                    >
                        {subscription?.subscribedChannel?.latestVideo && (
                            <VideoList
                                key={subscription?.subscribedChannel?._id}
                                avatar={
                                    subscription?.subscribedChannel?.avatar.url
                                }
                                duration={
                                    subscription?.subscribedChannel?.latestVideo
                                        ?.duration
                                }
                                title={
                                    subscription?.subscribedChannel?.latestVideo
                                        ?.title
                                }
                                thumbnail={
                                    subscription?.subscribedChannel?.latestVideo
                                        ?.thumbnail?.url
                                }
                                createdAt={
                                    subscription?.subscribedChannel?.latestVideo
                                        ?.createdAt
                                }
                                views={
                                    subscription?.subscribedChannel?.latestVideo
                                        ?.views
                                }
                                channelName={
                                    subscription?.subscribedChannel?.username
                                }
                                videoId={
                                    subscription?.subscribedChannel?.latestVideo
                                        ?._id
                                }
                            />
                        )}
                    </Link>
                ))}
            </div>
        </>
    );
}

export default MySubscriptions;