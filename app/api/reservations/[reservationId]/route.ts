import  {NextResponse } from 'next/server'

import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

interface IParams {
    reservationId: string
}

export async function DELETE(request:Request ,{ params }: { params: IParams }) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return Promise.resolve(NextResponse.error());
    }

    const {reservationId} = params

    if (!reservationId || typeof reservationId !== 'string') {
        return Promise.reject(new Error('Invalid Reservation Id'));
    }

   try {
    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {
                    user: {
                        id: currentUser.id
                    }
                },
                {
                    listing: {
                    
                        userId: currentUser.id,
                       
                    }
                }
            ]
           
        }
    })

    return Promise.resolve(NextResponse.json(reservation));
   } catch (error) {
       return Promise.resolve(NextResponse.error());
   }

}

