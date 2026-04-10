export type EventType = "meetup" | "webcast" | "workshop" | "codelab";

export type ScheduleItemType =
  | "talk"
  | "networking"
  | "food"
  | "announcement"
  | "clinic"
  | "news"
  | "intro"
  | "home";

export interface ScheduleItem {
  time: string;
  type: ScheduleItemType;
  talk?: string;
  desc?: string;
}

export interface EventLink {
  url: string;
  label: string;
}

export interface RawEvent {
  name: string;
  displayName: string;
  date: string;
  meetupUrl: string;
  type: EventType;
  meetup: number;
  venue?: string;
  rsvpLink?: string;
  schedule?: ScheduleItem[];
  instructor?: string[];
  videoUrl?: string;
  description?: string;
  takeaways?: string[];
  site?: string;
  ogImage?: string;
  icon?: string;
  links?: EventLink[];
}

export interface Event extends RawEvent {
  dateStr: string;
}

export interface Speaker {
  id: string;
  name: string;
  bio?: string;
  company?: string;
  image?: string;
  github?: string;
  twitter?: string;
  website?: string;
  linkedin?: string;
}

export interface MaterialType {
  type: "slide" | "repo" | "demo";
  url: string;
}

export interface Talk {
  id: string;
  title: string;
  speakers: string[];
  description?: string;
  materials?: MaterialType[];
}

export interface Venue {
  id: string;
  name: string;
  url?: string;
  logo?: string;
  mapURL?: string;
  directions?: string;
}

export interface UpdateLink {
  label: string;
  url: string;
}

export interface Update {
  title: string;
  description: string;
  meetupEvent: string;
  links?: UpdateLink[];
}

/** Resolved schedule item with talk and speaker data populated */
export interface ResolvedScheduleItem {
  time: string;
  type: ScheduleItemType;
  desc?: string;
  talk?: Omit<Talk, "speakers"> & { speakers: Speaker[] };
}

/** Event with venue resolved to full Venue object or "Online event" label */
export interface EventWithVenue extends Event {
  venueName: string;
  venueData?: Venue;
}
