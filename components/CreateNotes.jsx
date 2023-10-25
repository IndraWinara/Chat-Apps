import { Button, Textarea, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateNotes = ({ onClose }) => {
  const token = Cookies.get('token')
  const toast = useToast()
  const [notes, setNotes] = useState({
    description: "",
  });
  const router = useRouter()

  const handleCreate = async (e) => {
    e.preventDefault()
    if(notes.description === ''){
      toast({
        title: 'Fill the Threads',
        description: "Happy Chatting 😊",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position : 'top'
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
      position : 'top'
    })
    onClose()
    
  }

  return (
    <form className='p-2 md:h-[500px] md:w-[500px] h-[500px]' onSubmit={handleCreate} >
      <div className='h-full w-[350px]' >
        <div className='flex flex-col mt- gap-2 mt-2'>
          <h1 className='font-bold'>Description</h1>
          <Textarea onChange={(e) => setNotes({ ...notes, description: e.target.value })} placeholder='description' width={300} outlineColor='skyblue' />
        </div>
      </div>
      <div className='mt-[-40px] flex justify-end w-[300px]'>
        <Button colorScheme='purple' type='submit'>Create</Button>
      </div>
    </form>
  )
}

export default CreateNotes