"use client";

import React, { useCallback, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar";
import MenuItem from "./MenuItem";
import useRegistarModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
import useClickOutside from "@/app/hooks/useClickOutside";

interface userMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu: React.FC<userMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegistarModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const wraperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wraperRef, () => {
    setIsOpen(false);
  });
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // Open Rent Modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className='relative' ref={wraperRef}>
      <div className='flex flex-row items-center gap-3' >
        <div
          onClick={onRent}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        >
          Create a Property
        </div>
        <div
          onClick={toggleOpen}
          className='
          p-2
          md:py-1
          md:px-2 
            border-[1px]
          border-neutral-200 
            flex
            flex-row 
            items-center 
            gap-3 rounded-
            full 
            cursor-pointer 
            hover:shadow-md 
            transition '
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className='
      absolute
      rounded-xl
      shadow-md
      w-[40vw]
      md:w-3/4
      bg-white
      overflow-hidden
      right-0
      top-12
      text-sm
      '
        >
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label='My Trips'
                />
                <MenuItem onClick={() => router.push('/favorites')} label='My Favorites' />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label='My Reservations'
                />
                 <MenuItem onClick={()=> router.push('/properties')} label='My Properties' />

                <MenuItem onClick={rentModal.onOpen} label='Airbnb my home' />
                <hr />
                <MenuItem onClick={() => signOut()} label='Logout' />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label='Login' />
                <MenuItem onClick={registerModal.onOpen} label='Sign Up' />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
