"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  onAction,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, disabled, onAction],
  );

  const price = useMemo(() => {
    if(reservation) {
        return reservation.totalPrice
    }
    return data.price
  }
  , [data.price, reservation])

  const reservationDate=useMemo(() => {
    if(!reservation) {
        return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)
  }, [])

  return <div>ListingCard</div>;
};

export default ListingCard;
