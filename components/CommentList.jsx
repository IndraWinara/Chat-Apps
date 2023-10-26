import { useQueries } from '@/hooks/useQueries'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import ModalDelComment from './ModalDelComment'
import { useRouter } from 'next/router'
import { GlobalContext } from '@/context/GlobalContext'

const CommentList = ({ dataPost }) => {
    const userId = dataPost.id
    const {stateInput} = useContext(GlobalContext)
    const {setUserReplies} = stateInput
    const [postId, setPostId] = useState()
    const token = Cookies.get('token')
    const { data: list, fetchingData } = useQueries()
    const router = useRouter()
    const handleCheck = async (userId, dataPost) => {
        await fetchingData({ url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${userId}`, token: token })
        setPostId(dataPost?.user?.id)
    }

    const sortAscend = list?.data?.sort((item1, item2) => {
        const tanggal1 = new Date(item1.created_at);
        const tanggal2 = new Date(item2.created_at);
        return tanggal1 - tanggal2;
    })

    const handleSend = (item)=>{
        router.push(`/profile/${item.id}`)
        setUserReplies(item)
    }
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton color={'brown'} onClick={() => handleCheck(userId, dataPost)}>
                        <Box flex='1' textAlign='left'>
                            <p className='text-[14px] font-bold'>Comment ({dataPost?.replies_count})</p>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} height={'-webkit-fit-content'} maxHeight={150} overflow={'auto'} >
                    {sortAscend?.map((item) => {
                        const dateString = item?.updated_at;
                        const date = new Date(dateString);


                        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour : '2-digit', minute : '2-digit' };
                        const formattedDate = date.toLocaleDateString(undefined, options);
                        return (

                            <div key={item?.id} className={`text-[13px] flex gap-2 items-center ${item?.user?.id === postId ? "justify-start" : "md:justify-end"} `}>
                                <div className='flex items-center '>
                                {
                                    item?.is_own_reply ? <ModalDelComment data={item} /> : null
                                }
                                <Avatar name={item?.user?.name} size={'xs'} />
                                </div>
                                <div className='flex flex-col  w-fit'>
                                    <div className='flex items-center gap-1'>
                                    <div onClick={()=> handleSend(item)} className='font-bold cursor-pointer capitalize flex w-fit h-fit'>
                                        {item?.user?.name} :
                                    </div>
                                    <p className={`italic`}>{item.description}</p>
                                    </div>
                                    <p className='text-[11px] italic font-extralight'>{formattedDate}</p>
                                </div>
                            </div>
                        )
                    })}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>

    )
}

export default CommentList