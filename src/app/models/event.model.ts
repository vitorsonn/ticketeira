export interface EventRequest {
    name: string;
    dateTime: string; // Ou Date, dependendo de como você trata o JSON
    location: string;
    description: string;
  }

export interface EventResponse {
  id: number;
  name: string;
  dateTime: string;
  location: string;
  description: string;
};
