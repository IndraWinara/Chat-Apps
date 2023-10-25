import { useMutation } from '@/hooks/useMutation'
import { Button, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const LoginScreen = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dataInput = {email,password}
    const {mutate} = useMutation()
    const toast = useToast()
    const router = useRouter()


    const handleSubmit = async  (e)=>{
        e.preventDefault()
        try {
            if(!email && !password){
                return
            }
    
            const response = await mutate({
                url : 'https://paace-f178cafcae7b.nevacloud.io/api/login',
                payload : dataInput
            })
            const token = response.data.token
            Cookies.set('token',token,{expires : 1})
            Cookies.set('login',token,{expires : 1})

            toast({
                title: 'Login Success.',
                description: "Welcome to our app !! 😊.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position : 'top'
              })
              router.push('/')
            // console.log({token})
        } catch (error) {
            toast({
                title: 'Email or Password Wrong.',
                description: "Please Check your credentials.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position : 'top'
              })
        }
       
    }
  return (
    <div className='p-4 flex flex-row border-t-[4px] border-slate-800 border-[1px] md:w-[500px] md:h-[400px] w-[300px] h-[400px] rounded-lg'>
        <div className='w-[200px] md:flex hidden mr-2'>
            <Image src='https://i0.wp.com/www.techquintal.com/wp-content/uploads/2022/07/Virtual-Memory.jpg?resize=768%2C432&ssl=1' alt='loginbg' width={400} height={400} className='w-full h-full rounded-full object-cover'/>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold text-center md:text-[16px] text-[14px]'>Welcome to Our Thread Apps</h1>
            <form className=' h-[270px] flex flex-col' onSubmit={handleSubmit}>
                <div className='p-2 h-[100px] flex flex-col'>
                    <label className='font-semibold text-[14px]'>E-mail :</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email' type='email' required className='p-2 text-[14px] mt-2 outline-none border-[1px] border-slate-800 rounded-full'/>
                </div>
                <div className='p-2 h-[100px] flex flex-col'>
                    <label className='font-semibold text-[14px]'>Password :</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' type='password' required className='p-2 text-[14px] mt-2 outline-none border-[1px] border-slate-800 rounded-full'/>
                </div>
            <Button colorScheme='red' type='submit'>Login</Button>
            </form>
      
        </div>
    </div>
  )
}

export default LoginScreen