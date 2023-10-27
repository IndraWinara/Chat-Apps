
import { useMutation } from '@/hooks/useMutation'
import { Button, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const { mutate } = useMutation()
    const toast = useToast()
    const router = useRouter()
    const dataInput = { name, password, email }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(dataInput)
            await mutate({
                url: 'https://paace-f178cafcae7b.nevacloud.io/api/register',
                payload: dataInput
            })
            toast({
                title: 'Register Success.',
                description: "Login with your credential",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
           router.push('/login')

            // console.log({token})
        } catch (error) {
            toast({
                title: 'Register Failed.',
                description: "Please Check your credentials.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
        }

    }
    return (
        <div className='p-4 bg-white md:justify-start justify-center flex flex-row border-t-[4px] border-slate-800 border-[1px] md:w-[500px] md:h-[400px] w-[300px] h-[500px] rounded-lg'>
            <div className='w-[200px] md:flex hidden mr-2'>
                <Image src='https://i0.wp.com/www.techquintal.com/wp-content/uploads/2022/07/Virtual-Memory.jpg?resize=768%2C432&ssl=1' alt='loginbg' width={400} height={400} className='w-full h-full rounded-full object-cover' />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='font-bold text-center md:text-[16px] text-[14px]'>Welcome to Our Thread Apps</h1>
                <form className=' h-[350px] flex flex-col' onSubmit={handleSubmit}>
                    <div className='p-2 h-[100px] flex flex-col'>
                        <label className='font-semibold text-[14px]'>Name :</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder='username...' type='text' required className='p-2 text-[14px] mt-2 outline-none border-[1px] border-slate-800 rounded-full' />
                    </div>
                    <div className='p-2 h-[100px] flex flex-col'>
                        <label className='font-semibold text-[14px]'>E-mail :</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email@email.com' type='email' required className='p-2 text-[14px] mt-2 outline-none border-[1px] border-slate-800 rounded-full' />
                    </div>
                    <div className='p-2 h-[100px] flex flex-col'>
                        <label className='font-semibold text-[14px]'>Password :</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*******' type='password' required className='p-2 text-[14px] mt-2 outline-none border-[1px] border-slate-800 rounded-full' />
                    </div>
                    <div className='flex flex-col'>
                        <Button colorScheme='green' type='submit'>Register</Button>
                        <p className='text-[14px] text-end'>Already have account ? <Link href='/login' className='underline cursor-pointer'>login</Link></p>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default RegisterScreen