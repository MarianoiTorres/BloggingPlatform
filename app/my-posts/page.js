'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { client } from "@/src/configureAmplify";
import { getCurrentUser } from "aws-amplify/auth";
import { postsByUsername } from "@/src/graphql/queries";
import { deletePost as deletePostMutation } from "@/src/graphql/mutations";
import Markdown from "react-markdown"
import 'easymde/dist/easymde.min.css'
import { useDispatch, useSelector } from "react-redux";
import { deleteUserPost, getUserPostsAsync } from "@/redux/features/userSlice";

const MyPosts = () => {

    const posts = useSelector(state => state.userReducer.userPosts)
    const dispatch = useDispatch()
    
    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        dispatch(getUserPostsAsync())
    }

    const deletePost = async (id) => {
        dispatch(deleteUserPost(id))
    }

    return (
        <div className="container mx-auto mt-6 w-1/2">
            <h1 className="text-3xl font-semibold tracking-wide mb-2 text-center">My Posts</h1>
            {
                posts.map((post, index) => (
                    <div key={index} className="bg-white cursor-pointer  border border-gray-300 rounded-md p-4 mt-4 shadow-md transition-shadow duration-300 ease-in-out shadow-md hover:shadow-lg">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <div className="mt-8">
                            <Markdown className='prose' children={post?.content} />
                        </div>
                        <div className="space-x-5 mt-3">
                            <Link href={`/edit-post/${post.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                Edit Post
                            </Link>
                            <Link href={`/post/${post.id}`} className="bg-green-500 text-white px-4 py-2 rounded-md">
                                View Post
                            </Link>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={() => deletePost(post.id)}
                            >
                                Delete Post
                            </button>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default MyPosts