import { useMutation } from '@/hooks/useMutation'
import { useQueries } from '@/hooks/useQueries'
import { Button, Textarea, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'

const CommentScreen = ({onClose,data}) => {
    const token = Cookies.get('token')
    // const { fetchingData } = useQueries({ prefixUrl: 'https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all', tokenJwt: token })
    const [description, setDescription] = useState('')
  
    const { mutate } = useMutation()
    const toast = useToast()
    const handleReplies = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      if(description === ''){
        toast({
          title: 'Fill the description first',
          description: "Happy Chatting 😊",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position : 'top'
        })
        return
      }
  
      const response = await mutate({
        url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${data?.id}`,
        method: 'POST',
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
            title: 'Success Replies Threads',
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
    <form className='p-2 h-[500px] w-[500px] ' onSubmit={handleReplies} >
      <div className='h-full w-[350px]' >
        <div className='flex flex-col mt- gap-2 mt-2'>
          <h1 className='font-bold'>Description</h1>
          <Textarea value={description}
            onChange={(event) =>
              setDescription(event.target.value)} placeholder='description' width={300} outlineColor='skyblue' />
        </div>
      </div>
      <div className='mt-[-40px] flex justify-end w-[300px]'>
        <Button colorScheme='blue' type='submit'>Replies</Button>
      </div>
    </form>
  )
}

export default CommentScreen