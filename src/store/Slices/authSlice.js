import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
    loading: false,
    status: false,
    userData: null,
    accessToken: null,
    refreshToken: null,
};

export const createAccount = createAsyncThunk("register", async (data) => {
    try {
        // Upload avatar to Cloudinary
        const avatarFormData = new FormData();
        avatarFormData.append("file", data.avatar[0]);
        avatarFormData.append("upload_preset", import.meta.env.VITE_preset_key);

        const avatarUploadRes = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_cloud_name}/image/upload`,
            avatarFormData
        );

        // If a cover image is provided, upload it to Cloudinary
        let coverImageUploadRes;
        if (data.coverImage) {
            const coverImageFormData = new FormData();
            coverImageFormData.append("file", data.coverImage[0]);
            coverImageFormData.append("upload_preset", import.meta.env.VITE_preset_key);

            coverImageUploadRes = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_cloud_name}/image/upload`,
                coverImageFormData
            );
        }

        // Prepare the result object containing all form data and the Cloudinary URLs
        const result = {
            username: data.username,
            email: data.email,
            password: data.password,
            fullName: data.fullName,
            avatar: avatarUploadRes.data,  // Avatar Cloudinary response
            coverImage: coverImageUploadRes ? coverImageUploadRes.data : null,  // Cover Image Cloudinary response (if exists)
        };

        // Send the result data to your backend
        const response = await axiosInstance.post("/users/register", result, {
            headers: { "Content-Type": 'application/json' }
        });

        toast.success("Registered successfully!!!");
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        toast.error(error?.response?.data?.error || "Something went wrong.");
        throw error;
    }
});


export const userLogin = createAsyncThunk("login", async (data) => {
    try {
        const response = await axiosInstance.post("/users/login", data);
        console.log(response.data);
        return response.data.data.user;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const userLogout = createAsyncThunk("logout", async () => {
    try {
        const response = await axiosInstance.post("/users/logout");
        toast.success(response.data?.message);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const refreshAccessToken = createAsyncThunk("refreshAccessToken", async (data) => {
    try {
        const response = await axiosInstance.post("/users/refresh-token", data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});


export const changePassword = createAsyncThunk("changePassword", async (data) => {
    try {
        const response = await axiosInstance.post("/users/change-password", data);
        // console.log(response.data);
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const getCurrentUser = createAsyncThunk("getCurrentUser", async() => {
    const response = await axiosInstance.get("/users/current-user");
    // console.log(response.data);
    return response.data;
})

export const updateAvatar = createAsyncThunk("updateAvatar", async (avatar) => {
    try {
        const response = await axiosInstance.patch("/users/update-avatar",avatar );
        toast.success("Updated details successfully!!!");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const updateCoverImg = createAsyncThunk(
    "updateCoverImg",
    async (coverImage) => {
        try {
            const response = await axiosInstance.patch(
                "/users/update-coverImg",
                coverImage
            );
            toast.success(response.data?.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const updateUserDetails = createAsyncThunk(
    "updateUserDetails",
    async (data) => {
        try {
            const response = await axiosInstance.patch(
                "/users/update-user",
                data
            );
            toast.success("Updated details successfully!!!");
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAccount.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(userLogout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogout.fulfilled, (state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });
        builder.addCase(updateAvatar.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAvatar.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(updateAvatar.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateCoverImg.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCoverImg.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(updateCoverImg.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateUserDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
},
});
export default authSlice.reducer;