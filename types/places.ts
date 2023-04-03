export type Location = {
  latitude: number;
  longitude: number;
  address?: string;
};
export type Place = {
  title: string;
  image: string;
  location?: Location;
};
export type PlaceResponse = {
  id: number;
  title: string;
  image: string;
  address?: string;
  latitude?: number;
  longitude?: number;
};
