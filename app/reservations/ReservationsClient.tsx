"use client";

import React from "react";
import { SafeReservation, SafeUser } from "../types";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback,useState } from "react";
import Container from "../components/container";
import Head from "next/head";
import Heading from "../components/Heading";
import axios from "axios";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser;
}
const ReservationsClient:React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    
    const router = useRouter()
    const [deleteingId, setDeletingId] = useState('')

    const onCancel = useCallback((id:string) => {
        setDeletingId(id)

        axios.delete(`/api/reservations/${id}`)
        .then(()=> {
            toast.success('Reservation cancelled')
            router.refresh()
        }).catch((error) => {
            toast.error(error?.response?.data?.error || 'Something went wrong')
        }).finally(() => {
            setDeletingId('')
        
        })
    },[router])
    
    if(!currentUser) {
        router.push('/')
        return null
    }
  return <Container>
    <Heading title='Reservations' subtitle='Manage your reservations'/>
    <div className="
    mt-10
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8
    ">
        {
            reservations.map((reservation) => (
                <ListingCard 
                key={reservation.id} 
                data={reservation.listing} 
                reservation={reservation} 
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deleteingId===reservation.id}
                actionLabel='Cancel guest Reservation'
                currentUser={currentUser}
                />
            ))
        }

    </div>
  </Container>;
};

export default ReservationsClient;
