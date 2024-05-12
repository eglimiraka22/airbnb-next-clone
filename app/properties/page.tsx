import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";


import React from 'react'
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiePage =async () => {

    const currentUser =  await getCurrentUser();

    if (!currentUser) {
        return  (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login" />
            </ClientOnly>
        )
    
    }
    const listings = await getListings({
        userId: currentUser.id,
    });

    if (listings.length === 0) {
        return (
            <EmptyState title="No properties found" subtitle="Create a property" />
        )
    }
    
    return (
     <ClientOnly>
        <PropertiesClient listings={listings} currentUser={currentUser} />

     </ClientOnly>
    )

}

export default PropertiePage
