import { Location } from './places';

export type RoottStackParamList = {
  AllPlaces: undefined;
  AddPlace:
    | {
        location?: Location;
      }
    | undefined;
  Map: {
    location: Location | undefined;
    disabled?: boolean;
  };
  PlaceDetails: {
    placeId: number;
  };
};
