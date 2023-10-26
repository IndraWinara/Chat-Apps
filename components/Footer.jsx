import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { BsSendFill } from 'react-icons/bs'
import { GrAttachment } from 'react-icons/gr'
import { RiAttachmentFill } from 'react-icons/ri'
import Image from 'next/image';

const Footer = () => {
  const token = Cookies.get('token')
  const toast = useToast()
  const [notes, setNotes] = useState({
    description: "",
  });
  const router = useRouter()

  const handleCreate = async (e) => {
    e.preventDefault()
    if (notes.description === '') {
      toast({
        title: 'Fill the Threads',
        description: "Happy Chatting 😊",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      })
      return
    }
    const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/post', {
      method: "POST", headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }, body: JSON.stringify(notes)
    })

    setTimeout(() => {
      window.location.reload();
    }, 700);
    toast({
      title: 'Success Create Threads',
      description: "Happy Chatting 😊",
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    })

  }
  return (
    <div className='h-[70px] gap-2 p-2 bg-slate-700 w-full flex items-center fixed bottom-0 border-[1px] border-gray-300'>
      <div className='md:hidden lg:flex flex-row items-center  gap-1  w-[200px] hidden '>
        <div className='bg-white rounded-full'>
          <Image src='https://creazilla-store.fra1.digitaloceanspaces.com/icons/3244252/nextjs-icon-md.png' alt='header' width={40} height={40} />
        </div>
        <div>
        <h1 className='font-bold text-[13px] text-white'>ext Threads Apps </h1>
        <p className='text-[12px] text-white font-semibold'>Indra Winara™️ ©️2023</p>
        </div>

      </div>
      <div className='w-full md:mr-[150px] flex md:justify-center items-center gap-3'>
        <RiAttachmentFill size={30} className='rotate text-white mx-2 cursor-pointer' />
        <input onChange={(e) => setNotes({ ...notes, description: e.target.value })} type='text' placeholder='Whats happening now....' className='bg-gray-200 overflow-auto h-10 outline-none w-full rounded-lg px-2 md:max-w-[700px]' />
        <button className='hover:scale-110 duration-300 cursor-pointer' onClick={handleCreate}>
          <BsSendFill size={25} className='text-white' />
        </button>
      </div>
    </div>
  )
}

export default Footer