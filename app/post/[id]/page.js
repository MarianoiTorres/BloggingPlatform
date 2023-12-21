'use client'
import { useParams } from "next/navigation"
import Markdown from "react-markdown"
import 'easymde/dist/easymde.min.css'
import { client } from "@/src/configureAmplify"
import { getPost } from "@/src/graphql/queries"
import { useEffect, useState } from "react"
import { getUrl } from 'aws-amplify/storage';


const Post = () => {
    const params = useParams()

    const [post, setPost] = useState(null)
    const [coverImage, setCoverImage] = useState(null)

    
    useEffect(() => {
        const fetchPosts = async () => {
            const { id } = params
            const postData = await client.graphql({
                query: getPost, variables: { id }

            })

            setPost(postData.data.getPost)

            const result = await getUrl({key: postData.data.getPost.coverImage})

            setCoverImage(result.url.href)
        }
        fetchPosts()
    }, [params.id])




    return (
        <div className="container mx-auto mt-6 w-1/2">

            <h1 className="text-3xl font-semibold tracking-wide mb-2 text-center">Post de {post?.username}</h1>
            
            <div className="bg-white cursor-pointer  border border-gray-300 rounded-md p-4 mt-4 shadow-md transition-shadow duration-300 ease-in-out shadow-md hover:shadow-lg">
                <h1 className="text-xl font-semibold">{post?.title}</h1>
                {
                    coverImage && <img src={coverImage}/>
                }
                <div className="mt-8">
                    <Markdown className='prose' children={post?.content} />
                </div>
            </div>

        </div>
    )
}

export default Post
