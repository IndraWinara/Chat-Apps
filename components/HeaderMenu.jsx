import { useMutation } from '@/hooks/useMutation'
import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons'
import { IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React from 'react'
import {FaUserAstronaut} from 'react-icons/fa'
import {BiSolidLogOutCircle} from 'react-icons/bi'

const HeaderMenu = () => {
    const toast = useToast()
    const router = useRouter()
    const {mutate} = useMutation()
    const handleLogout = async (e) => {
        e.preventDefault()
        await mutate({
          url: 'https://paace-f178cafcae7b.nevacloud.io/api/logout'
        })
        Cookies.remove('token')
        Cookies.remove('login')
        toast({
          title: 'Logout Success.',
          description: "Sampai jumpa lagi 🫡",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top'
        })
        router.push('/login')
      }
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
                backgroundColor={'slategrey'}
                colorScheme='whiteAlpha'
            />
            <MenuList>
                <MenuItem icon={<FaUserAstronaut size={18} />} onClick={()=> router.push('/profile')} >
                   Profile
                </MenuItem >
                <MenuItem icon={<BiSolidLogOutCircle  size={21}/> }  onClick={handleLogout} color={'red.700'}>
                    SignOut
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default HeaderMenu