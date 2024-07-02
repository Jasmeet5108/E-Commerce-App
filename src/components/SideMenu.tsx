"use client"
import { useToken } from '@/context/TokenContext';
import Link from 'next/link';
import React from 'react'

interface MenuProps {
    open: boolean;
    toggle: React.Dispatch<React.SetStateAction<boolean>>
}

const SideMenu = ({ open, toggle }: MenuProps) => {

    const { isLoggedIn } = useToken()

    const closeMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        toggle(!open)
    }

    return (
        <div className={`sm:hidden sticky top-16 transition duration-300 bg-slate-800 text-white ${open ? "-translate-y-0" : "-translate-y-72"}`}>
            <ul className='flex flex-col gap-2 py-2'>
                <button className='font-semibold' onClick={closeMenu}>
                    <Link href={`${isLoggedIn ? "/cart/?loggedIn=true" : "/cart"}`}>Cart</Link>
                </button>
                <button className='font-semibold' onClick={closeMenu}>
                    <Link href={`${isLoggedIn ? "/about/?loggedIn=true" : "/about"}`}>About</Link>
                </button>
            </ul>
        </div>
    )
}

export default SideMenu