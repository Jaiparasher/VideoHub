import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
    loading: false,
    uploading: false,
    uploaded: false,
    videos: {
        docs: [],
        hasNextPage: false,
    },
    video: null,
    publishToggled: false
};

export const getAllVideos = createAsyncThunk(
    "getAllVideos",
    async ({userId, sortBy, sortType, query, page, limit}) => {
        try {
            const url = new URL(`${import.meta.env.VITE_base_url}/video`);

            if (userId) url.searchParams.set("userId", userId);
            if (query) url.searchParams.set("query", query);
            if (page) url.searchParams.set("page", page);
            if (limit) url.searchParams.set("limit", limit);
            if (sortBy && sortType) {
                url.searchParams.set("sortBy", sortBy);
                url.searchParams.set("sortType", sortType);
            }

            const response = await axiosInstance.get(url);
            console.log();
            
            
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const publishAVideo = createAsyncThunk("publishAVideo", async (data) => {

      const videoFormData = new FormData();
      videoFormData.append("file", data.videoFile[0]);
      videoFormData.append("upload_preset", import.meta.env.VITE_preset_key);

      const videoUploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_cloud_name
        }/video/upload`,
        videoFormData
      );
    
      const thumbnailFormData = new FormData();
      thumbnailFormData.append("file", data.thumbnail[0]);
      thumbnailFormData.append("upload_preset", import.meta.env.VITE_preset_key);

      const thumbnailUploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_cloud_name
        }/image/upload`,
        thumbnailFormData
      );
    
      const result = {
        title: data.title,
        description: data.description,
        videoFile: videoUploadRes.data,
        thumbnail: thumbnailUploadRes.data
      }

    try {
        const response = await axiosInstance.post('/video', result);

        toast.success(response?.data?.message);
        return response.data.data;
    } catch (error) {
        console.error("Upload error:", error);
        toast.error(error?.response?.data?.error || "Something went wrong.");
        throw error;
    }
});


export const updateAVideo = createAsyncThunk(
    "updateAVideo",
    async ({ videoId, data }) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("thumbnail", data.thumbnail[0]);

        try {
            const response = await axiosInstance.patch(
                `/video/v/${videoId}`,
                formData
            );
            toast.success(response?.data?.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const deleteAVideo = createAsyncThunk("deleteAVideo", async(videoId) => {
    try {
        const response = await axiosInstance.delete(`/video/v/${videoId}`);
        toast.success(response?.data?.message);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const getVideoById = createAsyncThunk(
    "getVideoById",
    async ({ videoId }) => {
        try {
            const response = await axiosInstance.get(`/video/v/${videoId}`);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const togglePublishStatus = createAsyncThunk("togglePublishStatus", async(videoId) => {
    try {
        const response = await axiosInstance.patch(`/video/toggle/publish/${videoId}`);
        toast.success(response.data.message);
        return response.data.data.isPublished;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        updateUploadState: (state) => {
            state.uploading = false;
            state.uploaded = false;
        },
        makeVideosNull: (state) => {
            state.videos.docs = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos.docs = [...state.videos.docs, ...action.payload.docs];
            state.videos.hasNextPage = action.payload.hasNextPage;
        });
        builder.addCase(publishAVideo.pending, (state) => {
            state.loading = true;
            state.uploading = true;
        });
        builder.addCase(publishAVideo.fulfilled, (state) => {
            state.uploaded = true;
            state.uploading = false;
        });
        builder.addCase(updateAVideo.pending, (state) => {
            state.uploading = true;
        });
        builder.addCase(updateAVideo.fulfilled, (state) => {
            state.uploading = false;
            state.uploaded = true;
        });
        builder.addCase(deleteAVideo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAVideo.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(getVideoById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getVideoById.fulfilled, (state, action) => {
            state.loading = false;
            state.video = action.payload;
        });
        builder.addCase(togglePublishStatus.fulfilled, (state) => {
            state.publishToggled = !state.publishToggled;
        });
    },
});

export const { updateUploadState, makeVideosNull } = videoSlice.actions;

export default videoSlice.reducer;