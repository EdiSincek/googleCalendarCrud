import { useState } from "react";
import { SimplifiedEvent } from "../types/Event";
import { useAuth } from "../contexts/AuthContext";

const useCalendar = (initialEvents: SimplifiedEvent[] = []) => {
  const [events, setEvents] = useState<SimplifiedEvent[]>(initialEvents);
  const { token } = useAuth();

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/google/calendar/getEvents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      localStorage.setItem("events", JSON.stringify(data));
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const createEvent = async (eventData: SimplifiedEvent) => {
    const response = await fetch(
      "http://localhost:3001/google/calendar/createEvent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      }
    );
    return response;
  };

  const deleteEvent = async (eventId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/google/calendar/event/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedEvents = events.filter(
          (event) => event.eventId !== eventId
        );
        setEvents(updatedEvents);
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return { events, fetchEvents, deleteEvent, createEvent };
};

export default useCalendar;
