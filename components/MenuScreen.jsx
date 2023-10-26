import { DragHandleIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit'

const MenuScreen = ({ data }) => {
    return (
        <Menu >
            <MenuButton as={Button} colorScheme='pink' size={'xs'} rightIcon={<DragHandleIcon />}>
            </MenuButton>
            <MenuList minWidth={100} >
                <div className='flex flex-col justify-center w-full items-center'>
                    <ModalEdit data={data} />
                    <ModalDelete data={data} />
                </div>
            </MenuList>
        </Menu>
    )
}

export default MenuScreen