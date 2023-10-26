import Image from 'next/image';
import React, { useState, useEffect, useContext } from 'react'; // Import useEffect
import ModalCreate from './ModalCreate';
import { Button, useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useMutation } from '@/hooks/useMutation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NotifScreen from './NotifScreen';
import { GlobalContext } from '@/context/GlobalContext';
import HeaderMenu from './HeaderMenu';

const Header = ({token : ssr}) => {
  const token = Cookies.get('token');
  const {stateInput} = useContext(GlobalContext)
  const {isLoggedIn} = stateInput
  const [info,setInfo] = useState()
  const { mutate } = useMutation()
  const toast = useToast()
  const router = useRouter()

 

 
  
  

  const getUserInfo = async () => {
    const response = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/user/me', {method:"GET", headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}` } })
    const ress = response.json()
    return ress
}
  useEffect(()=>{
    if(token){
      getUserInfo().then((ress)=>setInfo(ress))
    }
  },[])


  return (
    <header className='fixed z-10 bg-slate-300 w-full p-2 h-[80px] flex justify-between'>
      {/* logo */}
      <div className='flex justify-between w-[65%] items-center gap-2'>
        <div className='flex items-center'>
        <Link href={isLoggedIn ? '/' : '/login'}>
          <Image src='https://creazilla-store.fra1.digitaloceanspaces.com/icons/3244252/nextjs-icon-md.png' alt='header' width={40} height={40} />
        </Link>
        <h1 className='font-bold text-lg ml-2'>ext Threads Apps</h1>
        </div>
        {isLoggedIn && <h1  className='md:flex hidden md:text-[14px]'>Welcome , <span className='mr-2 font-bold'>{info?.data?.email}</span> Happy Chatting !!😊😊 </h1>}
      </div>
      <div className='flex items-center w-fit'>
        {isLoggedIn ? (
          <div className='flex gap-2'>
            <NotifScreen/>
            <HeaderMenu/>
          </div>
        ) : (
          <Button onClick={() => router.push('/register')}>Get Started !</Button>
        )}
      </div>
    </header>
  );
};

export default Header;


