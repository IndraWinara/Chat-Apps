import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import React from 'react'
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

const ProfileAccordion = ({ filterdata }) => {
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton color={'brown'}>
                        <Box flex='1' textAlign='left'>
                            <p className='text-[14px] font-bold'>My Threads ({filterdata?.length}) </p>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} height={'-webkit-fit-content'} maxHeight={300} overflow={'auto'} >
                    <div className='p-2 flex flex-col gap-3 full '>
                    {filterdata?.map((item, index) => (
                        <div key={index} className='border-[1px] border-sky-500 rounded-lg p-2'>
                            <p className='font-bold capitalize'>{item?.description.slice(0,10)}</p>
                            <p className='p-2 text-[15px]'>{item?.description}</p>
                            <div className='flex justify-between'>
                                {item?.is_own_post ? <><ModalDelete data={item} />
                                    <ModalEdit data={item} /></> : null}
                            </div>
                        </div>
                    ))}
                    </div>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>

    )
}

export default ProfileAccordion