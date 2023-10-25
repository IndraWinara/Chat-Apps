import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import CreateNotes from './CreateNotes'
import CommentScreen from './CommentScreen'

const ModalComment = ({data}) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)
  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}
        colorScheme='blue'
        size={'sm'}
      >
        Replies
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent width={350}>
          <ModalHeader>Replies Thread</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <CommentScreen onClose={onClose} data={data} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalComment