'use client'
import { loginService } from '@/domain/services/loginService';
import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { REGISTER_ROUTE } from '@/utilities/localRoutes';

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = (e: 
        React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        loginService({ email, password })
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <h1 className="text-4xl mb-10">Login Page</h1>
            <Image
                className='mb-10'
                src="https://media2.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif?cid=6c09b952iud88a7u4lufuh2ehvyq0mz86o3i32g1dfrwpzo3&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                alt="fire room with a dog saying its fine"
                width={400}
                height={400}
            />
            <form className="flex flex-col">
                <label htmlFor='email'>Email</label>
                <input
                    id='email'
                    onChange={handleEmailChange}
                    value={email} className="text-neutral-900 pl-2" type="text" placeholder="email" />
                <label htmlFor='password' className="mt-6">Password</label>
                <input
                    id='password'
                    onChange={handlePasswordChange}
                    value={password} className="text-neutral-900 pl-2" type="password" placeholder="password" />
                <Button
                    className="mt-6"
                    type="submit"
                    isDisabled={!email || !password}
                    onClick={handleLogin}
                >Login</Button>
            </form>
            <p className="mt-6">Don`t have an account? <a onClick={() => {router.replace(REGISTER_ROUTE)}} className="text-primary-400 hover:cursor-pointer">Register</a></p>
        </div>
    )
}