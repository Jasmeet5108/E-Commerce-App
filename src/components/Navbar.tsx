"use client"
import { useToken } from '@/context/TokenContext'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import SideMenu from './SideMenu'
import { useCart } from '@/context/CartContext'
import DropdownArrowIcon from '@/assets/icons/dropdownArrow'
import CartIcon from '@/assets/icons/cartIcon'

const Navbar = () => {
    const { user, removeTokenFromLocalStorage } = useToken();
    const { cart } = useCart()
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false)

    const searchParams = useSearchParams();
    const isLoggedIn = searchParams.get("loggedIn");

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
                            <CartIcon />
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
                                        Welcome, {user?.username ?? "user"}
                                        <DropdownArrowIcon className={`-mr-1 ml-2 h-5 w-5 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
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
