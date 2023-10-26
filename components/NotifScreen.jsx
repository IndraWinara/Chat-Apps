import { useQueries } from '@/hooks/useQueries';
import { BellIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, ButtonGroup, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

const NotifScreen = () => {
    const initialFocusRef = useRef();
    const [currentStep, setCurrentStep] = useState(0);
    const token = Cookies.get('token');
    const { data: notif } = useQueries({ prefixUrl: 'https://paace-f178cafcae7b.nevacloud.io/api/notifications', tokenJwt: token });
    const router = useRouter()
    const steps = notif?.data;

    const currentStepData = notif?.data[currentStep];

    //date format
    const dateString = currentStepData?.updated_at;
    const date = new Date(dateString);
   

    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour : '2-digit', minute : '2-digit' };
    const formattedDate = date.toLocaleDateString(undefined, options);
  
    return (
        <Popover
            initialFocusRef={initialFocusRef}
            placement='bottom'
            closeOnBlur={false}
        >
            <PopoverTrigger>
                <Button><BellIcon/> ({steps?.length})</Button>
            </PopoverTrigger>
            <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                    <div className='flex items-center gap-2'>
                        <Avatar size={'xs'} name={currentStepData?.user.name} />
                        <div onClick={()=> router.push(`/profile/${currentStepData?.user?.id}`)} className='cursor-pointer hover:scale-105 duration-300 text-[14px] font-bold '>{currentStepData?.user.email}</div>
                    </div>
                </PopoverHeader>
                <PopoverArrow bg='blue.800' />
                <PopoverCloseButton />
                <PopoverBody>
                    {currentStepData ? (
                        <div className='flex flex-col justify-center items-center'>
                            <div className='flex items-center gap-1'>

                                <p className='text-[14px] font-bold capitalize'>{currentStepData?.user.name}</p>
                                <p className='text-[14px] font-semibold'>{currentStepData?.remark} your post about</p>
                            </div>
                            <div className='text-[14px]'>
                                {currentStepData?.posts.description.length > 40
                                    ? <p>{currentStepData?.posts.description.slice(0, 40) + '...'}</p>
                                    : <p>{currentStepData?.posts.description}</p>}
                                <p className='text-center text-[14px] font-extralight italic'>on {formattedDate}</p>
                            </div>

                        </div>
                    ) : (
                        <h1>No Notification 😊</h1>
                    )}
                </PopoverBody>
                <PopoverFooter
                    border='0'
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    pb={4}
                >
                    <Box fontSize='sm'>{`Notif ${currentStep + 1} of ${steps?.length}`}</Box>
                    <ButtonGroup size='sm'>
                        <Button
                            colorScheme='blue'
                            ref={initialFocusRef}
                            onClick={() => {
                                if (currentStep > 0) {
                                    setCurrentStep(currentStep - 1); // Kembali ke langkah sebelumnya
                                }
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            colorScheme='blue'
                            onClick={() => {
                                if (currentStep < steps.length - 1) {
                                    setCurrentStep(currentStep + 1); // Lanjut ke langkah berikutnya
                                }
                            }}
                        >
                            Next
                        </Button>
                    </ButtonGroup>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

export default NotifScreen;
