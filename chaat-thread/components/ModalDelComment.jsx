import { useMutation } from '@/hooks/useMutation'
import { useQueries } from '@/hooks/useQueries'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const ModalDelComment = ({ data }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [deleteId, setDeleteId] = useState()
    const token = Cookies.get('token')
    const { fetchingData } = useQueries({ prefixUrl: 'https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all', tokenJwt: token })
    const { mutate } = useMutation()
    const router = useRouter()
    const toast = useToast()



    const handleDelete = async () => {
        await mutate({
            url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/delete/${deleteId}`,
            method: 'DELETE',
            token: token
        })
        setTimeout(() => {
            window.location.reload();
        }, 400);

        toast({
            title: 'Success Delete Comment',
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
            <div >
                <button className='hover:scale-105 duration-300' onClick={() => {
                    onOpen()
                    setDeleteId(data.id)
                }}>❌</button>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={'sm'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Comment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <h1>Are you sure delete this comment?</h1>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button colorScheme='blackAlpha' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalDelComment