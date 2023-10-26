import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import EditNotes from './EditNotes'


const ModalEdit = ({ data }) => {
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
      <button
        onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}
        className='bg-green-500 w-[80px] text-white font-semibold rounded-full text-[14px]'
      >
        Edit
      </button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent width={350}>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditNotes data={data} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalEdit