import { Location } from './places';

export type RoottStackParamList = {
  AllPlaces: undefined;
  AddPlace: {
    location: Location;
  };
  Map: {
    location: Location | undefined;
  };
};
