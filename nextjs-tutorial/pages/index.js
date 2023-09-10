import React from 'react'
import { getFeaturedEvents, getAllEvents } from '../dummy-data'
import EventList from '../components/events/event-list';

export default function HomePage() {
  const featuredEvents = getAllEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  )
}