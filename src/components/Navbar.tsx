"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFetch } from '../../context/FetchContext'

const Navbar = () => {
    const { removeTokenFromLocalStorage } = useFetch()
    const router = useRouter()
    const [name, setName] = useState(null)
    const [loading, setLoading] = useState(false)

    const getUserDetails = async () => {
        const res = await fetch("/api/user", {
            method: "GET"
        })
        const data = await res.json()
        setName(data.data.username)
    }

    const logout = async (e: React.MouseEvent) => {
        e.preventDefault()
        setLoading(true)
        removeTokenFromLocalStorage()
        try {
            const response = await fetch("/api/logout", {
                method: "GET",
            })
            const res = await response.json()
            if (res.success) {
                router.push("/login")
                setLoading(false)
            }
            else {
                console.log("Error logging out");
                setLoading(false)
            }
        } catch (error: any) {
            console.log(error.message);
            setLoading(false)
        }
    }

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        getUserDetails()
    }, [])

    // const handleLogoutClick = (e: React.MouseEvent) => {
    //     e.stopPropagation();
    //     logout();
    // };


    return (
        <header className='sticky top-0 bg-slate-800'>
            <nav className='flex justify-between items-center max-w-screen-2xl px-3 mx-auto h-16'>
                <div className='text-lg sm:text-xl text-white'>
                    <div id='sidemenu' className='flex flex-col gap-2 sm:hidden'>
                        <span className='w-9 h-1 bg-white rounded-xl'></span>
                        <span className='w-9 h-1 bg-white rounded-xl'></span>
                        <span className='w-9 h-1 bg-white rounded-xl'></span>
                    </div>
                    <ul className='hidden sm:flex gap-5'>
                        <li>
                            <Link href="/cart">Cart</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                    </ul>
                </div>
                <div className='flex justify-end w-52 sm:w-64'>
                    <div className="relative text-center">
                        <button
                            onClick={toggleDropdown}
                            type="button"
                            className="inline-flex justify-center items-center box-border p-2 border shadow-sm text-base font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900"
                        >
                            Welcome, {name ?? "user"}
                            <svg
                                className={`-mr-1 ml-2 h-5 w-5 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <button type='button' onClick={logout} className="origin-top-right cursor-pointer flex justify-center items-center absolute right-0 mt-2 h-10 w-52 rounded-md shadow-lg text-white bg-slate-800 ring-1 ring-white ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <p className='flex gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                            <path d="M7.02331 5.5C4.59826 7.11238 3 9.86954 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 9.86954 19.4017 7.11238 16.9767 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p>{loading ? "logging out..." : "Logout"}</p>
                                    </p>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar