import { useMutation } from '@/hooks/useMutation'
import { useQueries } from '@/hooks/useQueries'
import { Button, Textarea, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const EditNotes = ({ onClose, data }) => {
  const token = Cookies.get('token')
  const [description, setDescription] = useState(data?.description)

  const { mutate } = useMutation()
  const toast = useToast()
  const handleEdit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if(description === data?.description){
      toast({
        title: 'Nothing to Change',
        description: "Happy Chatting 😊",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position : 'top'
      })
      return
    }

    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/post/update/${data?.id}`,
      method: 'PATCH',
      token: token,
      payload: { description },
    });
    
    if (!response?.success) {
      console.log(error.message);
    } else {
      try {
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 400);
    
        toast({
          title: 'Success Edit Threads',
          description: 'Happy Chatting',
          status: 'success',
          duration: 1000,
          isClosable: true,
          position: 'top',
        });
    
        // Use setTimeout to reload the page after 3 seconds
      } catch (error) {
        console.error(error);
      }
    }

  };



  return (
    <form className='p-2 h-[500px] w-[500px] ' onSubmit={handleEdit} >
      <div className='h-full w-[350px]' >
        <div className='flex flex-col mt- gap-2 mt-2'>
          <h1 className='font-bold'>Description</h1>
          <Textarea value={description}
            onChange={(event) =>
              setDescription(event.target.value)} placeholder='description' width={300} outlineColor='skyblue' />
        </div>
      </div>
      <div className='mt-[-40px] flex justify-end w-[300px]'>
        <Button colorScheme='green' type='submit'>Edit</Button>
      </div>
    </form>
  )
}

export default EditNotes