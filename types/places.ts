export type Location = {
  latitude: number;
  longitude: number;
};
export type Place = {
  title: string;
  image: string;
  location?: Location;
};
