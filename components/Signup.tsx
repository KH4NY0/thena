'use client';
import appwriteService from "@/appwrite/config";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";


const Signup = () => {

    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    })
    const [error, setError] = useState("")

    const {setAuthStatus} = useAuth()

    const create = async (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        try {
           const userData = await appwriteService.createUserAccount(formData);
           if (userData) {
               setAuthStatus(true)
               router.push('/app/dashboard')
           }
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-200/50 rounded-xl p-10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[60px]">
                        <img src="/public/icons/social-media.png" alt="Sign up icon"  />
                    </span>
                </div>
                <h2 className="text-center text-2xl font leading-tight text-black">
                    Sign up to create an account
                </h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        href="/app/auth/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={create} className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="name" className="text-base font-medium text-gray-900">Full Name</label>
                            <div className="mt-2">
                                <input className="flex h-10 w-full rounded-md border border-gray-300
                                bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1
                                 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                 type="text"
                                 placeholder="Enter your full name"
                                 id="name"
                                 value={formData.name}
                                 onChange={(e) => setFormData((prev) =>({ ...prev, name:e.target.value}))}
                                 required
                                 />
                            </div>
                        </div>
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
                                Create Account
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Signup