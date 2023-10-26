import { useMutation } from '@/hooks/useMutation'
import { useQueries } from '@/hooks/useQueries'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text, ModalOverlay, useDisclosure,useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ModalDelete = ({ data }) => {
  const token = Cookies.get('token')
  // const [deleteId,setDeleteId] = useState()
  const {fetchingData} = useQueries({prefixUrl : 'https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all',tokenJwt : token })
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)
  const { mutate } = useMutation()
  const router = useRouter()
  const toast = useToast()
  const handleDelete = async (e) => {
    e.preventDefault()
    await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${data?.id}`,
      method: 'DELETE',
      token : token
    })
    await fetchingData({url :'https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all', token : token })
    setTimeout(() => {
      window.location.reload();
    }, 400);

    toast({
      title: 'Success Delete Threads',
      description: 'Happy Chatting',
      status: 'error',
      duration: 1000,
      isClosable: true,
      position: 'top',
    });
    onClose()
    router.push('/')
  }
  return (
    <>
      <button
        onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
          // setDeleteId(data.id)
        }}
        className='bg-red-600 w-[80px] rounded-full text-white font-semibold text-[14px] mt-2'
      >
        Delete
      </button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent width={350}>
          <ModalHeader>Delete Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are your sure delete this notes?</Text>
          </ModalBody>
          <ModalFooter className='gap-2'>
            <Button colorScheme='red' onClick={handleDelete}>Delete</Button>
            <Button colorScheme='blackAlpha' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalDelete