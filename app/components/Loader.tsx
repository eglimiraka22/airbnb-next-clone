'use client'

import { PuffLoader ,BarLoader } from "react-spinners"

const Loader = () => {
    return (
        <div className='h-[70vh] flex flex-col justify-center items-center'>
        <PuffLoader size={100} color='#FF385C' />
        </div>
    )
    }

export default Loader
