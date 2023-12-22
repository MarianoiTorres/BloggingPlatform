'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import '../src/configureAmplify'
import Link from 'next/link'
import { Hub } from "aws-amplify/utils";
import { useEffect, useState } from 'react';
import { getCurrentUser } from "aws-amplify/auth";
import StoreProvider from '@/redux/providers'
import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {




  return (
    <html lang="en">

      <body className={inter.className}>
        <StoreProvider>
          <NavBar></NavBar>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
