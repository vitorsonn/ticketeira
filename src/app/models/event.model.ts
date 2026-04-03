export interface EventRequest {
    id: number
    name: string;
    dateTime: string; // Ou Date, dependendo de como você trata o JSON
    location: string;
    description: string;
    sectors: SectorRequest[];
  }

export interface EventResponse {
  id: number;
  name: string;
  dateTime: string;
  location: string;
  description: string;
};

export interface SectorRequest {
  name: string;
  capacity: number;
  price: number;
}
