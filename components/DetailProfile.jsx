import { useQueries } from '@/hooks/useQueries'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit'
import { GlobalContext } from '@/context/GlobalContext'

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

 
   
    return (
        <div className='p-4 border-t-[4px] border-[1px] border-sky-500 rounded-lg w-[400px] h-[500px]'>
            <div className='flex flex-col h-[400px] w-full'>
                <h1 className='mb-[100px]'>Welcome , <span className='font-extrabold'>{filter  ? filter?.user?.name : userReplies?.user?.name} </span>this your personal information</h1>
                <ul className='w-full'>
                    <li className='text-[16px] font-semibold w-full'> Name : <span className='font-normal'>{filter  ? filter?.user?.name : userReplies?.user?.name}</span></li>
                    <li className='text-[16px] font-semibold w-full'> Email : <span className='font-normal'>{filter  ? filter?.user?.email : userReplies?.user?.email}</span></li>
                    <li className='text-[16px] font-semibold w-full'> Account Create : <span className='font-normal'>{filter  ? filter?.created_at : userReplies?.created_at}</span></li>
                    <div>
                        <h1 className='font-bold'>My Threads</h1>
                        {filteredUser?.map((item, index) => (
                            <div key={index}>
                                {item?.description}
                                <div className='flex justify-between'>
                                    {item?.is_own_post ? <><ModalDelete data={item} />
                                        <ModalEdit data={item} /></> : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    )

}

export default DetailProfile