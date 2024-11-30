export class Convert {
  static toRestaurants(json: string): Restaurant[] {
    return JSON.parse(json);
  }
  static restaurantsToJson(value: Restaurant[]): string {
    return JSON.stringify(value);
  }
  static toRestaurant(json: string): Restaurant {
    return JSON.parse(json);
  }
  static restaurantToJson(value: Restaurant): string {
    return JSON.stringify(value);
  }
}

export interface Restaurant {
  formattedAddress: string;
  name: string;
  location: Location;
  rating: number;
  googleMapsUri: string;
  websiteUri: string;
  regularOpeningHours: RegularOpeningHours;
  priceLevel: string;
  userRatingCount: number;
  displayName: DisplayName;
  photos: Photo[];
  accessibilityOptions: AccessibilityOptions;
}

export interface AccessibilityOptions {
  wheelchairAccessibleEntrance: boolean;
  wheelchairAccessibleRestroom: boolean;
  wheelchairAccessibleSeating: boolean;
}

export interface DisplayName {
  text: string;
  languageCode: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Photo {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: AuthorAttribution[];
  flagContentUri: string;
  googleMapsUri: string;
}

export interface AuthorAttribution {
  displayName: string;
  uri: string;
  photoUri: string;
}

export interface RegularOpeningHours {
  openNow: boolean;
  periods: Period[];
  weekdayDescriptions: string[];
  nextOpenTime: Date;
}

export interface Period {
  open: Close;
  close: Close;
}

export interface Close {
  day: number;
  hour: number;
  minute: number;
}
