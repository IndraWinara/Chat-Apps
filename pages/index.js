import Image from 'next/image'
import { Inter } from 'next/font/google'
import Card from '@/components/Card'
import { useMutation } from '@/hooks/useMutation'
import { useQueries } from '@/hooks/useQueries'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import LayoutRoot from '@/layouts/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const token = Cookies.get('token')
  const { data: listData } = useQueries({ prefixUrl: 'https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all', tokenJwt: token })


  return (
    <LayoutRoot>
      <div className="flex flex-col justify-between h-screen">
        <div className='w-full flex flex-col'>
          <div className='p-2 mt-[90px] flex flex-col items-center justify-center gap-2 mb-[100px]'>
            {listData?.data?.map((item) => {
              return (<Card data={item} key={item?.id} />)
              
            })}
          </div>
        </div>
      </div>
    </LayoutRoot>
  )
}




