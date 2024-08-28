'use client'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LOGIN_ROUTE, MEETINGS_ROUTE } from '@/utilities/localRoutes';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { registerService } from '@/domain/services/registerService';
import { useAuth } from '@/hooks/useAuth';

export default function Register() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registerCode, setRegisterCode] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleClickPasswordEye = () => setShowPassword(!showPassword)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const handleClickConfirmPasswordEye = () => setShowConfirmPassword(!showConfirmPassword)

    const isButtonDisabled = !email || !password || !confirmPassword || !registerCode || !name || password !== confirmPassword

    const {isAuthenticated, setIsAuthenticated} = useAuth()


    const handleRegister = async (e:
        React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        try {
            setError('')
            e.preventDefault()
            await registerService({ name, email, password, registerCode })
            setIsAuthenticated(true)
            router.push(MEETINGS_ROUTE)
        } catch (error: Error | any) {
            setError(error.message)
            console.error(error)
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <h1 className="text-4xl mb-10">Register Page</h1>
            <Image
                className='mb-6'
                src="https://media2.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif?cid=6c09b952iud88a7u4lufuh2ehvyq0mz86o3i32g1dfrwpzo3&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                alt="fire room with a dog saying its fine"
                width={400}
                height={400}
            />
            <form className="flex flex-col">
                <label htmlFor='name'>Name</label>
                <Input
                    id='name'
                    onChange={(event) => setName(event.target.value)}
                    value={name} className="text-white pl-2" type="email" placeholder="name" />
                <label htmlFor='email' className='mt-3'>Email</label>
                <Input
                    id='email'
                    onChange={(event) => setEmail(event.target.value)}
                    value={email} className="text-white pl-2" type="text" placeholder="email" />
                <label htmlFor='password' className="mt-3">Password</label>
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
                <label htmlFor='confirmPassword' className="mt-3">Confirm Password</label>
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
                {password !== confirmPassword && <p className="text-red-500">Passwords do not match</p>}
                <label htmlFor='secretCode' className="mt-3">Secret code</label>
                <Input
                    id='secretCode'
                    onChange={(event) => setRegisterCode(event.target.value)}
                    value={registerCode} className="text-white pl-2" type="text" placeholder="secretCode" />

                <Button
                    className="mt-3"
                    type="submit"
                    onClick={handleRegister}
                    isDisabled={isButtonDisabled}
                >Register</Button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <p className="mt-3">Already have an account? <a onClick={() => { router.replace(LOGIN_ROUTE) }} className="text-primary-400 hover:cursor-pointer">Login</a></p>
        </div>
    )
}