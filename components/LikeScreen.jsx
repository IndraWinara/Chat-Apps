import { useMutation } from '@/hooks/useMutation';
import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

const LikeScreen = ({ data }) => {
    const [like, setLike] = useState(data?.is_like_post);
    const { mutate } = useMutation();
    const token = Cookies.get('token');
    const toast = useToast();

    const handleLike = async (req) => { 
        if(like){
            const ressUnlike = await mutate({ url :`https://paace-f178cafcae7b.nevacloud.io/api/unlikes/post/${req.id}`,token :token})
            setLike(ressUnlike?.data?.is_like_post)
            window.location.reload()
        }else {
            const ressLike = await mutate({ url :`https://paace-f178cafcae7b.nevacloud.io/api/likes/post/${req.id}`,token :token})
            setLike(ressLike?.data?.is_like_post)
            window.location.reload()
        }
    }


    return (
        <div className='flex items-center gap-2'>
            {
                like ? 
                
                <button onClick={() => handleLike(data)} className='text-[20px]'>
                    👎
                </button> : <button onClick={() => handleLike(data)} className='text-[20px]'>
                    👍
                </button>
            }
        </div>
    );
}

export default LikeScreen;