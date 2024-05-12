"use client"

import React, { useCallback, useState } from 'react'
import { SafeListing, SafeUser } from '../types'
import Container from '../components/container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { error } from 'console';
import ListingCard from '../components/listings/ListingCard';


interface PropertiesClientProps {
    listings:SafeListing[];
    currentUser:SafeUser | null;
}

const PropertiesClient:React.FC<PropertiesClientProps> = ({currentUser,listings}) => {
    const router = useRouter()

    const [deleteingId, setDeletingId] = useState('')

    const onCancel = useCallback(
      (id:string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(()=> {
            toast.success('Listing Deleted')
            router.refresh()
        }).catch((error) => {
            toast.error(error?.response?.data?.error || 'Something went wrong')
        }).finally(() => {
            setDeletingId('')
        
        })
        
      },
      [router],
    )
    


    if(!currentUser) {
        router.push('/')
        return null
    }
  return (
    <Container>
        <Heading title='Properties' subtitle="List of your properties"/>

        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>

            {listings.map((listings) => (
                <ListingCard 
                key={listings.id} 
                data={listings} 
                actionId={listings.id}
                onAction={onCancel}
                disabled={deleteingId===listings.id}
                actionLabel='Delete Property'
                currentUser={currentUser} />
            ))}

        </div>
    </Container>
   
  )
}

export default PropertiesClient