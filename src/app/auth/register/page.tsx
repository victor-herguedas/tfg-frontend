'use client'
import { loginService } from '@/domain/services/loginService';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LOGIN_ROUTE } from '@/utilities/localRoutes';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [secret, setSecret] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleClickPasswordEye = () => setShowPassword(!showPassword)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const handleClickConfirmPasswordEye = () => setShowConfirmPassword(!showConfirmPassword)

    const isButtonDisabled = !email || !password || !confirmPassword || !secret || password !== confirmPassword


    const handleRegister = () => {
        if (password === confirmPassword) {
            loginService({ email, password })
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <h1 className="text-4xl mb-10">Register Page</h1>
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
                    onChange={(event) => setEmail(event.target.value)}
                    value={email} className="text-white pl-2" type="text" placeholder="email" />
                <label htmlFor='password' className="mt-6">Password</label>
                <InputGroup size='md'>
                    <Input
                        id='password'
                        value={password}
                        className='text-white pl-2'
                        onChange={(event) => setPassword(event.target.value)}
                        pr='4.5rem'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClickPasswordEye}>
                            {showPassword ?
                                <FaEyeSlash /> :
                                <FaEye />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <label htmlFor='confirmPassword' className="mt-6">Confirm Password</label>
                <InputGroup size='md'>
                    <Input
                        id='confirmPassword'
                        value={confirmPassword}
                        className='text-white pl-2'
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        pr='4.5rem'
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm password'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClickConfirmPasswordEye}>
                            {showConfirmPassword ?
                                <FaEyeSlash /> :
                                <FaEye />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <label htmlFor='secretCode' className="mt-6">Secret code</label>
                <Input
                    id='secretCode'
                    onChange={(event) => setSecret(event.target.value)}
                    value={secret} className="text-white pl-2" type="text" placeholder="secretCode" />

                <Button
                    className="mt-6"
                    type="submit"
                    onClick={handleRegister}
                    isDisabled={isButtonDisabled}
                >Register</Button>
            </form>
            <p className="mt-6">Already have an account? <a onClick={() => { router.replace(LOGIN_ROUTE) }} className="text-primary-400 hover:cursor-pointer">Login</a></p>
        </div>
    )
}