import React, { useEffect } from 'react'

const Modal = ({modelcontent,closeModal}) => {

    useEffect(()=>{
        setTimeout(()=>{
         closeModal();
        },3000 );
    })
    return (
        <div className='modelcontent'>
            <p>{modelcontent}</p>
        </div>
    );
};

export default Modal
