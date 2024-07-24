"use client"
import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <div>Home:here is <Link href="/todo" className='text-red-700'>todo</Link> page</div>
  )
}
