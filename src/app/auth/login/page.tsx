'use client'
import { loginService } from '@/domain/services/loginService';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MEETINGS_ROUTE, REGISTER_ROUTE } from '@/utilities/localRoutes';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShow] = useState(false)
    const handleClickPasswordEye = () => setShow(!showPassword)
    const {isAuthenticated, setIsAuthenticated} = useAuth()


    const handleLogin = async (e:
        React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        try {
            e.preventDefault()
            setError('')
            await loginService({ email, password })
            setIsAuthenticated(true)
            router.push(MEETINGS_ROUTE)
        } catch (error: Error | any) {
            setError(error.message)
            console.error(error)
        }
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
                <Input
                    id='email'
                    onChange={handleEmailChange}
                    value={email} className="text-white pl-2" type="text" placeholder="email" />
                <label htmlFor='password' className="mt-6">Password</label>
                <InputGroup size='md'>
                    <Input
                        id='password'
                        value={password}
                        className='text-white pl-2'
                        onChange={handlePasswordChange}
                        pr='4.5rem'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClickPasswordEye}>
                            {showPassword ? 
                            <FaEyeSlash/> : 
                            <FaEye/>}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button
                    className="mt-6"
                    type="submit"
                    isDisabled={!email || !password}
                    onClick={handleLogin}
                >Login</Button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <p className="mt-6">Don`t have an account? <a onClick={() => { router.replace(REGISTER_ROUTE) }} className="text-primary-400 hover:cursor-pointer">Register</a></p>
        </div>
    )
}