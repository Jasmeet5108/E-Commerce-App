"use client";
import { useToken } from "@/context/TokenContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/helpers/toast";

export default function Page() {
  const { storeTokenInLocalStorage } = useToken();

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handler = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const postData = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      if (!res.success) {
        toast({ type: "error", message: res.msg });
      } else if (res.success) {
        const user = {
          username: res.username,
        };
        storeTokenInLocalStorage(res.token, user);
        router.replace("/?loggedIn=true");
        toast({ type: "success", message: res.msg });
      }
    } catch (err: any) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col justify-start items-center gap-5 h-[650px] sm:mt-10">
        <div className="text-blue-500 sm:text-xl">
          <Link href="/">&larr; &nbsp; Back to Dashboard</Link>
        </div>
        <div className="w-full max-w-[352px] sm:max-w-lg mt-4">
          <form
            onSubmit={postData}
            className="bg-white shadow-md rounded-xl px-5 pt-6 pb-8 mb-4"
          >
            <div>
              <h2 className="font-semibold text-xl text-center">
                Create your account
              </h2>
              <p className="mt-1 text-sm sm:text-base text-gray-500 text-center">
                Welcome! Please fill in the details
              </p>
            </div>
            <div className="my-6">
              <label
                className="block text-gray-700 text-sm sm:text-base font-bold my-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handler}
                id="username"
                type="text"
                placeholder="username"
                name="username"
                value={data.username}
                required
              />
            </div>
            <div className="mb-4">
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
                name="email"
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
                name="password"
                value={data.password}
                required
              />
            </div>
            <div className="flex flex-col items-center justify-between">
              {loading ? (
                <div className="w-20">
                  <Image
                    src="/login-loader.gif"
                    width={80}
                    height={50}
                    alt="loader"
                  />
                </div>
              ) : (
                <button
                  className={`bg-blue-500 flex justify-center w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  type="submit"
                >
                  {" "}
                  Sign up
                </button>
              )}

              <div className="mt-4 text-sky-600 text-sm lg:text-base underline underline-offset-4">
                <Link href="/login">Already have an account?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
