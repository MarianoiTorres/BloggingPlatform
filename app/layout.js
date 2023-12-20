'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import '../src/configureAmplify'
import Link from 'next/link'
import { Hub } from "aws-amplify/utils";
import { useEffect, useState } from 'react';
import { getCurrentUser } from "aws-amplify/auth";

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {

  const [signedInUser, setSignedInUser] = useState(false)

  useEffect(() => {
    const authListener = async () => {
      Hub.listen('auth', ({ payload }) => {
        switch (payload.event) {
          case 'signIn':
            return setSignedInUser(true)
          case 'signOut':
            return setSignedInUser(false)
        }
      })
      try {
        await getCurrentUser()
        setSignedInUser(true)
      } catch (error) {

      }
    }
    authListener()
  }, [])


  return (
    <html lang="en">

      <body className={inter.className}>
        <nav className='bg-white p-4 text-center shadow-md'>
          <div className='container mx-auto space-x-14'>
            <Link href='/' className='text-black font-bold hover:text-blue-500'>
              <span>Home</span>
            </Link>
            {
              signedInUser && (
                <Link href='/create-post' className='text-black font-bold hover:text-blue-500'>
                  <span>Create Post</span>
                </Link>
              )
            }
            <Link href='/profile' className='text-black font-bold hover:text-blue-500'>
              <span>Profile</span>
            </Link>
            {
              signedInUser && (
                <Link href='/my-posts' className='text-black font-bold hover:text-blue-500'>
                  <span>My Posts</span>
                </Link>
              )
            }
          </div>

        </nav>
        {children}
      </body>
    </html>
  )
}
