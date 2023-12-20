'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { client } from "@/src/configureAmplify";
import { getCurrentUser } from "aws-amplify/auth";
import { postsByUsername } from "@/src/graphql/queries";
import { deletePost as deletePostMutation } from "@/src/graphql/mutations";
import Markdown from "react-markdown"
import 'easymde/dist/easymde.min.css'

const MyPosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        const { username, userId } = await getCurrentUser()

        const usernameToGet = userId + "::" + username
        /* Cuando crea un posteo une el userId y el username para tener una mejor unicidad */
        const postData = await client.graphql({
            query: postsByUsername, variables: { username: usernameToGet }
        })
        console.log(postData.data);
        setPosts(postData.data.postsByUsername.items)
    }

    const deletePost = async (id) => {
        await client.graphql({
            query: deletePostMutation,
            variables: { input: { id } },
            authMode: "userPool"
        })
        fetchPosts()
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