'use client'
import React, { useEffect } from "react"
import EmptyState from "./components/EmptyState"

interface ErrorProps {
    error:Error
}

const ErrorState:React.FC<ErrorProps> = ({error}) => {
    useEffect(() => {
        console.error(error)
    }, [error])


    return (
       <EmptyState title='Uh oh' subtitle='An error occurred. Please try again later.'/>
    )
}

export default ErrorState