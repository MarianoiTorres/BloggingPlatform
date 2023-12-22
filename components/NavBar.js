import { getCurrentUser } from "aws-amplify/auth"
import { Hub } from "aws-amplify/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const NavBar = () => {

    const [signedInUser, setSignedInUser] = useState(false)
    const dispatch = useDispatch()
    
const userData = useSelector(state => state.userReducer.user)
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

    return(
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
    )
}

export default NavBar