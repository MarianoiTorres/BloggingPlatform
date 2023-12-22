import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "@/src/configureAmplify";
import { listPosts } from "@/src/graphql/queries";

const initialState = {
    posts: []
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getPostsAsync.fulfilled, (state, action) => {
            state.posts = action.payload
        })
    }
})

export const getPostsAsync = createAsyncThunk(
    'getPostsAsync',
    async () => {
        const posts = await client.graphql({ query: listPosts })
        return posts.data.listPosts.items
    }
)

export default postsSlice.reducer