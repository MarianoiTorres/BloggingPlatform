'use client'
import { useState, useEffect } from "react";
import { client } from "@/src/configureAmplify";
import { useParams, useRouter } from "next/navigation";
import SimpleMdeReact from "react-simplemde-editor";
import 'easymde/dist/easymde.min.css'
import { updatePost } from "@/src/graphql/mutations";
import { getPost } from "@/src/graphql/queries";

const EditPost = () => {
    const [post, setPost] = useState()
    const params = useParams()
    const router = useRouter()
    const { id } = params

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return
            const postData = await client.graphql({ query: getPost, variables: { id } })
            setPost(postData.data.getPost)
        }
        fetchPost()
    }, [id])
    if (!post) return null

    const onChangeHandler = (e) => {
        setPost(() => ({ ...post, [e.target.name]: e.target.value }))
    }
    const { title, content } = post

    const updateCurrentPost = async () => {
        if (!title || !content) return

        await client.graphql({
            query: updatePost,
            variables: { input: { title, content, id } },
            authMode: 'userPool'
        })
        console.log('actualizado');
        router.push('/my-posts')
    }

    return (
        <div className=" container mx-auto mt-6 w-1/2">
            <h1 className="text-3xl font-semibold tracking-wide mt-6 text-center">Edit Post</h1>
            <input
                onChange={onChangeHandler}
                name='title'
                placeholder="title"
                value={post.title}
                className="p-2 border-b text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
            />
            <SimpleMdeReact value={post.content} onChange={value => setPost({ ...post, content: value })} />
            <button
                onClick={updateCurrentPost}
                className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
            >Update Post</button>
        </div>
    )
}

export default EditPost