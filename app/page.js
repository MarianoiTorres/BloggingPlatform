'use client'
import { useState, useEffect } from "react"
import { listPosts } from "@/src/graphql/queries";
import Link from "next/link";
import { client } from "@/src/configureAmplify";
import Markdown from "react-markdown"
import 'easymde/dist/easymde.min.css'
import { getUrl } from 'aws-amplify/storage';

const Home = () => {

  const [posts, setPosts] = useState()
  const [coverImage, setCoverImage] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {

      const postsData = await client.graphql({ query: listPosts })

      setPosts(postsData.data.listPosts.items)

    }
    fetchPosts()
  }, [])

  return (
    <div className="container mx-auto mt-6 w-1/2">
      <h1 className="text-3xl font-semibold tracking-wide mb-2 text-center">Posts</h1>
      {posts?.map((post, index) => (
        <Link key={index} href={`/post/${post.id}`}>
          <div className="bg-white cursor-pointer  border border-gray-300 rounded-md p-4 mt-4 shadow-md transition-shadow duration-300 ease-in-out shadow-md hover:shadow-lg">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <div className="mt-8">
              <Markdown className='prose' children={post?.content} />
            </div>
            <p className="mt-2 text-sm text-gray-500 font-semibold">Author: {post.username}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Home