import React from 'react'
import ModalEdit from './ModalEdit'
import ModalDelete from './ModalDelete'
import { useRouter } from 'next/router'
import ModalComment from './ModalComment'
import CommentList from './CommentList'
import Cookies from 'js-cookie'
import { Avatar } from '@chakra-ui/react'




const Card = ({ data }) => {
  const router = useRouter()
  const dataId = data.id

  const dateString = data?.updated_at;
  const date = new Date(dateString);
  
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);
  return (
    <div className='border-t-[4px] border-sky-500 border-[1px] p-2 md:w-[700px] md:h-fit w-[400px] h-fit rounded-lg'>
      <div className='flex flex-col'>
        <div className='overflow-auto'>
          <div className='flex flex-row items-center gap-2'>
          <Avatar name={data?.user?.name} size={'sm'}/>
          <button onClick={()=> router.push(`/profile/${data?.users_id}`) } className='font-bold h-[40px] text-center '>{data?.user?.email}</button>
          </div>
          <p className='text-[12px] italic mb-2'>updated at : {formattedDate}</p>
        </div>
        <div className='overflow-auto h-[100px] md:h-fit md:max-h-[70px] text-[14px]'>
          <p>{data?.description}</p>
        </div>
        <CommentList dataPost = {data}/>
        <div className='flex justify-between mt-2'>
          {data?.is_own_post ? <><ModalDelete data={data} />
            <ModalEdit data={data} /> <ModalComment data={data} /></> : <ModalComment data={data}/> }
        </div>
      </div>
    </div>
  )
}

export default Card