
//this funtion fetches a list of events 
export async function getAllEvents(){
const response = await fetch('https://nextjs-course-9ec81-default-rtdb.firebaseio.com/events.json');
const data = await response.json();

const events = [];

for  (const key in data) {
    events.push({
        id: key,
        ...data[key]
    });
}

return events;
} 

//filters them to return only events marked featured.
export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
  }
//search for specific event  by ID
  export async function getEventById(id) {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
  }
//
  export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
  

    const allEvents = await getAllEvents();
//converts the events date and compares the year and month
    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }
  