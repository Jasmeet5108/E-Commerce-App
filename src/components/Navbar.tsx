"use client"
import { useToken } from '@/context/TokenContext'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SideMenu from './SideMenu'
import { useCart } from '@/context/CartContext'

const Navbar = () => {
    const { removeTokenFromLocalStorage } = useToken();
    const { cart } = useCart()
    const router = useRouter();
    const [name, setName] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false)

    const searchParams = useSearchParams();
    const isLoggedIn = searchParams.get("loggedIn");

    const getUserDetails = async () => {
        try {
            const res = await fetch("/api/user", {
                method: "GET"
            });
            const data = await res.json();
            setName(data.data.username);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    useEffect(() => {
        if (isLoggedIn === "true" && !name) {
            getUserDetails();
        }
    }, [isLoggedIn, name]);

    const logout = async (e: React.MouseEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch("/api/logout", {
                method: "GET",
            });
        } catch (error: any) {
            console.log("Error logging out:", error.message);
        } finally {
            router.replace("/");
            removeTokenFromLocalStorage();
            setDropdownOpen(false);
            setName(null);
        }
        setLoading(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <header className='sticky top-0 bg-slate-800 z-50'>
                <nav className='flex justify-between items-center max-w-screen-2xl px-3 mx-auto h-16 sm:h-20'>
                    <div className='flex items-center gap-1 text-lg sm:text-xl text-white'>
                        <Link href={`${isLoggedIn ? "/cart/?loggedIn=true" : "/cart"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                <path d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M6 6H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <circle cx="6" cy="20" r="2" stroke="currentColor" stroke-width="1.5" />
                                <circle cx="17" cy="20" r="2" stroke="currentColor" stroke-width="1.5" />
                                <path d="M8 20L15 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </Link>
                        <p className='text-sm'>{cart.length}</p>
                    </div>
                    <div className='flex justify-end w-52 sm:w-64'>
                        <div className="relative text-center">
                            {
                                isLoggedIn === "true"
                                    ?
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
                                    :
                                    <div className='flex gap-5 sm:gap-10 text-white'>
                                        <div className='text-base sm:text-xl font-semibold'>
                                            <Link href="/register">Register</Link>
                                        </div>
                                        <div className='text-base sm:text-xl font-semibold'>
                                            <Link href="/login">Login</Link>
                                        </div>
                                    </div>
                            }

                            {
                                isDropdownOpen && (
                                    <button type='button' onClick={logout} className="origin-top-right cursor-pointer flex justify-center items-center absolute right-0 mt-2 h-10 w-52 rounded-md shadow-lg text-white border border-white bg-slate-800 ring-1 ring-white ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <p>
                                                {
                                                    loading
                                                        ?
                                                        <p>Logging out...</p>
                                                        :
                                                        <div className='flex gap-2'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                                                <path d="M7.02331 5.5C4.59826 7.11238 3 9.86954 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 9.86954 19.4017 7.11238 16.9767 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            <p>Logout</p>
                                                        </div>
                                                }
                                            </p>
                                        </div>
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </nav>
            </header>

            <SideMenu open={menuOpen} toggle={setMenuOpen} />
        </>
    );
};

export default Navbar;
