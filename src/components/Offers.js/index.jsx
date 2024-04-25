import React, { useEffect } from 'react';
import { offerURL } from '../Constrains';

function Offers(){

    useEffect(()=>{
        const offersFetchAPI= async()=>{
            try {
               const responce = await axios.get(offerURL),{
                header : {
                    projectId : 
                }
               } 
            }
        }
    },[])

    return (
        <>

        </>
    )
}

export default Offers;