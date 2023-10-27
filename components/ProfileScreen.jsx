import { useQueries } from '@/hooks/useQueries'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit'
import ProfileAccordion from './ProfileAccordion'


const DetailProfile = ({data}) => {
    const token = Cookies.get('token')
    const router = useRouter()

    const { data: list } = useQueries({ prefixUrl: 'https://paace-f178cafcae7b.nevacloud.io/api/user/me', tokenJwt: token })
    const { data: desc } = useQueries({ prefixUrl: 'https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all', tokenJwt: token })
    const user = list?.data?.id
    const filteredUser = desc?.data?.filter((item) => item.user.id == user)


    const dateString = list?.data?.created_at;
    const date = new Date(dateString);
  
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
  
    return (
        <div className='p-4 bg-white border-t-[4px] border-[1px] border-sky-500 rounded-lg md:w-[500px] w-[400px] h-fit'>
            <div className='flex flex-col h-fit w-full'>
                <h1 className=''>Welcome , <span className='font-extrabold'>{list?.data?.name} </span>this your personal information</h1>
                <ul className='w-full'>
                    <li className='text-[16px] font-semibold w-full'> Name : <span className='font-normal capitalize'>{list?.data?.name}</span></li>
                    <li className='text-[16px] font-semibold w-full'> Email : <span className='font-normal'>{list?.data?.email}</span></li>
                    <li className='text-[16px] font-semibold w-full'> Account Create : <span className='font-normal'>{formattedDate}</span></li>
                    <ProfileAccordion filterdata={filteredUser}/>
                    
                </ul>
            </div>
        </div>
    )

}

export default DetailProfile