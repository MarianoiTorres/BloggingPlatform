import { client } from "@/src/configureAmplify";
import { postsByUsername } from "@/src/graphql/queries";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { deletePost, updatePost } from "@/src/graphql/mutations";

const initialState = {
    user: {},
    userPosts: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUserAsync.fulfilled, (state, action) => {
            state.user = action.payload;
        }),
        builder.addCase(getUserPostsAsync.fulfilled, (state, action) => {
            state.userPosts = action.payload
        }),
        builder.addCase(deleteUserPost.fulfilled, (state, action) => {
            state.userPosts = state.userPosts.filter(post => post.id !== action.payload.id);
        })
    }
})

export const getUserAsync = createAsyncThunk(
    'getUserAsync',
    async () => {
        const currentUser = await getCurrentUser();
        const userAttributes = await fetchUserAttributes();
        const userData = {
            username: currentUser.username,
            userId: currentUser.userId,
            email: userAttributes.email
        }
        return userData
    }
)

export const getUserPostsAsync = createAsyncThunk(
    'getUserPostsAsync',
    async () => {
        const { username, userId } = await getCurrentUser()
        const usernameToGet = userId + "::" + username
        /* Cuando crea un posteo une el userId y el username para tener una mejor unicidad */
        const postData = await client.graphql({
            query: postsByUsername, variables: { username: usernameToGet }
        })
        console.log(postData);
        return postData.data.postsByUsername.items
    }
)

export const deleteUserPost = createAsyncThunk(
    'deleteUserPost',
    async (id) => {
        const postDeleted = await client.graphql({
            query: deletePost,
            variables: { input: { id } },
            authMode: "userPool"
        })
        console.log(postDeleted);
        return postDeleted.data.deletePost
    }
)

export const { setUsers } = userSlice.actions

export default userSlice.reducer