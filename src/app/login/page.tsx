"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Form = () => {

    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [message, setMessage] = useState(null)

    const handler = (e: any) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const postData = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const res = await response.json()
            if (!res.success) {
                setMessage(res.msg)
                setTimeout(() => {
                    setMessage(null);
                }, 2000);
            }
            else if (res.success) {
                router.push("/dashboard")
            }
        } catch (err: any) {
            console.log(err);
        }
        setLoading(false)
    }


    return (
        <div className="flex justify-center items-center h-[650px]">
            <div className="w-full max-w-[352px] sm:max-w-lg">
                <form onSubmit={postData} className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
                    <div>
                        <h2 className='mb-1 font-semibold text-xl text-center'>Login</h2>
                        <p className="mt-1 text-sm sm:text-base text-gray-500 text-center">Welcome back!</p>
                    </div>
                    <div className="my-6">
                        <label
                            className="block text-gray-700 text-sm sm:text-base font-bold my-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handler}
                            id="email"
                            type="email"
                            placeholder="email"
                            name='email'
                            value={data.email}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm sm:text-base font-bold my-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handler}
                            id="password"
                            type="password"
                            placeholder="******************"
                            name='password'
                            value={data.password}
                            required
                        />
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        {loading ? <Image src="/loading.jpg" width={70} height={70} alt="loader" /> :
                            <button
                                className={`bg-blue-500 flex justify-center w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                type="submit"> Login
                            </button>
                        }
                        <div className="mt-4 text-sky-600 text-sm underline underline-offset-4">
                            <Link href="/">Create a new account</Link>
                        </div>
                        {/* Response message */}
                        {message && <div className='mt-4 border border-red-600 py-1 px-2 bg-red-100 rounded-md'>
                            <p className="text-rose-500">{message}</p>
                        </div>}
                    </div>
                </form>

                {/* <button className='p-1 text-lg text-black bg-white cursor-pointer'>{isLoggedIn ? "Logged In" : "Not Logged In"}</button> */}
            </div>
        </div>
    )
}

export default Form