'use client'
import Image from "next/image"

import { useRouter } from "next/navigation"



const Logo = () => {
    const router = useRouter()
  return (
    <Image
    onClick={()=>router.push('/')}
        alt="Logo"
        src="/images/logo.png"
        className=" max-w-[70px] sm:max-w-none sm:w-auto h-auto cursor-pointer"
        width={100}
        height={100}
        priority 
        
      />
  )
}

export default Logo
