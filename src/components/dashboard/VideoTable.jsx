import React from "react";
import { ImBin, GrEdit } from "../../components/icons";
import TogglePublish from "../TogglePublish";

function VideoTable({ videos, setPopUp, setVideoDetails }) {
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }) + ' ' + date.toLocaleTimeString('en-US');
    };
    

    return (
        <>
            <section className="mx-auto w-full overflow-x-scroll">
                <table className="min-w-full border border-slate-500">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-slate-500">
                                Video
                            </th>
                            <th className="py-2 px-4 border-b border-slate-500">
                                Uploaded
                            </th>
                            <th className="py-2 px-4 border-b border-slate-500">
                                Rating
                            </th>
                            <th className="py-2 px-4 border-b border-slate-500">
                                Date Uploaded
                            </th>
                            <th className="py-2 px-4 border-b border-slate-500"></th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {videos?.map((video) => (
                            <tr key={video?._id}>
                                <td className="py-2 px-4 border-b border-slate-500">
                                        <img
                                        className="w-96"
                                        src={video?.thumbnail.url}
                                        alt={video?.title}
                                    />
                                </td>
                                <td className="py-2 px-4 border-b border-slate-500">
                                    {video?.title}
                                </td>
                                <td className="border-b border-slate-500">
                                    <span className="border rounded-lg outline-none px-2 bg-green-200 text-green-600">
                                        {video?.views ?video?.views :0} views
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b border-slate-500">
                                    {formatDate(video.createdAt)}
                                </td>
                                <td className="py-2 border-b border-slate-500">
                                    <span className="flex gap-3 justify-start">
                                        <ImBin
                                            size={20}
                                            className="cursor-pointer hover:text-[#FD7014]"
                                            onClick={() => {
                                                setPopUp((prev) => ({
                                                    ...prev,
                                                    deleteVideo:
                                                        !prev.deleteVideo,
                                                }));
                                                setVideoDetails(video);
                                            }}
                                        />
                                        <GrEdit
                                            size={20}
                                            className="cursor-pointer hover:text-[#FD7014]"
                                            onClick={() => {
                                                setPopUp((prev) => ({
                                                    ...prev,
                                                    editVideo: !prev.editVideo,
                                                }));
                                                setVideoDetails(video);
                                            }}
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default VideoTable;