"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

  const router = useRouter()
  const [name, setName] = useState(null)

  const logout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
      })
      const res = await response.json()
      if (res.success) {
        router.push("/login")
      }
      else{
        console.log("Error logging out");
        
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const getUserDetails = async () => {
    const res = await fetch("/api/user", {
      method: "GET"
    })
    const data = await res.json()
    console.log(data);
    setName(data.data.username)
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <div>
      <p>Welcome, {name}</p>
      <hr />
      <button onClick={logout}>Logout</button>
      <br />
    </div>
  )
}

export default page