'use client';
import appwriteService from "@/appwrite/config";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Login = () => {
    const router = useRouter()
    const { setAuthStatus } = useAuth()
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    })
    const [error, setError] = useState("")

    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
           const session = await appwriteService.login(formData);
           if (session) {
               setAuthStatus(true)
               router.push("/app/dashboard")
           }
        } catch (error:any) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-200/50 rounded-xl p-10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[60px]">
                        <img src="/public/icons/id.png" alt="Login icon"/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font leading-tight text-black">
                    Login to your account
                </h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Don't have an account?&nbsp;
                    <Link
                        href="/app/auth/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={login} className="mt-8">
                        <div>
                            <label htmlFor="email" className="text-base font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input className="flex h-10 w-full rounded-md border border-gray-300
                                    bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1
                                     focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                       type="email"
                                       placeholder="Enter your email"
                                       id="email"
                                       value={formData.email}
                                       onChange={(e) => setFormData((prev) => ({...prev, email: e.target.value}))}
                                       required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-base font-medium text-gray-900">Password</label>
                            <div className="mt-2">
                                <input className="flex h-10 w-full rounded-md border border-gray-300
                                    bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1
                                     focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                       type="password"
                                       placeholder="Enter your password"
                                       id="password"
                                       value={formData.password}
                                       onChange={(e) => setFormData((prev) => ({...prev, password: e.target.value}))}
                                       required
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-primary/80">
                                Login
                            </button>
                        </div>
                </form>
             </div>
        </div>


    );
}

export default Login