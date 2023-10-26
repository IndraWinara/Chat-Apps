import { useQueries } from '@/hooks/useQueries'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit'
import { GlobalContext } from '@/context/GlobalContext'
import ProfileAccordion from './ProfileAccordion'

const DetailProfile = () => {
    const token = Cookies.get('token')
    const router = useRouter()
    const [filter, setFilter] = useState()
    const {stateInput} = useContext(GlobalContext)
    const {userReplies} = stateInput
    const user = router?.query.id
    const { data: list } = useQueries({ prefixUrl: 'https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all', tokenJwt: token })
    const { data: desc } = useQueries({ prefixUrl: 'https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all', tokenJwt: token })
    const filteredUser = desc?.data?.filter((item) => item.user.id == user)
    const filteredData = list?.data?.filter((item) => item.user.id == user)

    useEffect(() => {
        filteredData?.map((prev) => setFilter(prev))
    }, [filteredData])

    const dateString = filter?.created_at || userReplies.created_at
    const date = new Date(dateString);
  
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
   
    return (
        <div className='p-4 border-t-[4px] border-[1px] border-sky-500 rounded-lg md:w-[500px] w-[400px] h-fit'>
            <div className='flex flex-col h-fit w-full'>
                <h1 className=''>Hello from 👋 <span className='font-extrabold'>{filter  ? filter?.user?.name : userReplies?.user?.name} </span>this my profile</h1>
                <ul className='w-full'>
                    <li className='text-[16px] font-semibold w-full'> Name : <span className='font-normal'>{filter  ? filter?.user?.name : userReplies?.user?.name}</span></li>
                    <li className='text-[16px] font-semibold w-full'> Email : <span className='font-normal'>{filter  ? filter?.user?.email : userReplies?.user?.email}</span></li>
                    <li className='text-[16px] font-semibold w-full'> Account Create : <span className='font-normal'>{filter  && formattedDate }</span></li>
                    <ProfileAccordion filterdata={filteredUser}/>
                </ul>
            </div>
        </div>
    )

}

export default DetailProfile