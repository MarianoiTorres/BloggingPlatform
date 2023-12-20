'use client'
import { useRouter } from "next/navigation"
import { client } from "@/src/configureAmplify"
import { createPost } from "@/src/graphql/mutations"
import { useState, useRef } from "react"
import { v4 as uuid } from 'uuid'
import SimpleMdeReact from "react-simplemde-editor"
import 'easymde/dist/easymde.min.css'
import { withAuthenticator } from "@aws-amplify/ui-react"
import { uploadData } from 'aws-amplify/storage';


const initialState = { title: '', content: '' }

const CreatePost = () => {
    const [post, setPost] = useState(initialState)
    const [image, setImage] = useState(null)
    const hiddenFileInput = useRef(null)

    const { title, content } = post
    const router = useRouter()


    const onChangeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const createNewPost = async () => {
        if (!title || !content) return
        const id = uuid()
        post.id = id

        const fileName = `${image.name}_${uuid()}`
        console.log(fileName);
        post.coverImage = fileName

        const result = await client.graphql({
            query: createPost,
            variables: {
                input: post
            },
            authMode: "userPool"
        })
        console.log(result);
        router.push(`/post/${id}`)
    }

    const uploadImage = async () => {
        hiddenFileInput.current.click()
    }

    const handleChange = (e) => {
        if (e?.target?.files) {
            const file = e.target.files[0];
            uploadData({
                key: 'hola',
                data: file
            });
            setImage(file)
        }
    }

    return (
        <div className=" container mx-auto mt-6 w-1/2">
            <h1 className="text-3xl font-semibold tracking-wide mt-6">Create New Post</h1>
            <input
                onChange={onChangeHandler}
                name="title"
                placeholder="Title"
                value={post.title}
                className="p-2 border-b text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
            />
            {
                image && (
                    <img src={URL.createObjectURL(image)} className="my-4" />
                )
            }
            <SimpleMdeReact value={post.content} onChange={value => setPost({ ...post, content: value })} />
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                className="absolute w-0 h-0"
            />

            <button
                className="bg-purple-600 text-white font-semibold px-8 py-2 rounded-lg mr-2"
                onClick={uploadImage}
            >Upload Cover Image</button>
            <button
                type="button"
                className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
                onClick={createNewPost}
            >Create Post</button>
        </div>
    )
}

export default CreatePost