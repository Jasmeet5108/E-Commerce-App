import React from 'react'

interface MenuProps {
    open: boolean;
}

const SideMenu = ({ open }: MenuProps) => {
    return (
        <div>
            <div className={`sm:hidden transition duration-300 bg-slate-800 text-white ${open ? "-translate-y-0" : "-translate-y-72"}`}>
                <ul>
                    <li>Cart</li>
                    <li>About</li>
                </ul>
            </div>
        </div>
    )
}

export default SideMenu