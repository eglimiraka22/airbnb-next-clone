import React from 'react'
import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getFavoritesListings from '../actions/getFavoritesListings'
import FavoritesClient from './FavoritesClient'

const FavoritesPage =async () => {

    const listings = await getFavoritesListings();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title='No Favorites'
                subtitle='You can add listings to your favorites by clicking the heart icon on any listing.'
            />
        );
    }

    if (listings.length === 0) {
        return (
            <EmptyState
                title='No Favorites'
                subtitle='You can add listings to your favorites by clicking the heart icon on any listing.'
            />
        );
    }
  return (
    <ClientOnly>
        <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>  
  )
}

export default FavoritesPage


