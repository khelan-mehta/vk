// export interface SignUpFormData {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
// }

// export interface SignUpResponse {
//   message: string;
//   owner: {
//     ownerName: string;
//     email: string;
//     password: string;
//     phoneNumber: string;
//     restaurantIds: string[];
//     isVerified: boolean;
//     _id: string;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//   };
//   token: {
//     access_token: string;
//     _oid: string;
//     // _rid: string
//   };
// }

// export interface SignInResponse {
//   access_token: string;
//   _oid: string;
//   // _rid: string;
// }

// export interface Location {
//   type: "Point";
//   coordinates: [number, number];
// }

// export interface RestaurantResponse {
//   restaurantName: string;
//   city: string;
//   country: string;
//   location: Location;
//   deliveryPrice: number;
//   estimatedDeliveryTime: number;
//   cuisines: string[];
//   menuItems: Array<{
//     _id?: string;
//     name: string;
//     price: number;
//   }>;
//   imageUrl?: string;
//   _id: string;
//   lastUpdated: string;
//   __v: number;
// }

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignUpResponse {
  message: string;
  owner: {
    ownerName: string;
    email: string;
    password: string;
    phoneNumber: string;
    restaurantIds: string[];
    isVerified: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  token: {
    access_token: string;
    _oid: string;
  };
}

export interface SignInResponse {
  access_token: string;
  _oid: string;
  _rid?: string;
}

export interface Location {
  type: "Point";
  coordinates: [number, number];
}

export interface RestaurantResponse {
  restaurantName: string;
  city: string;
  country: string;
  location: Location;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: Array<{
    _id?: string;
    name: string;
    price: number;
  }>;
  imageUrl?: string;
  _id: string;
  lastUpdated: string;
  __v: number;
}
export enum OrderStatus {
  PENDING = "pending",
  IN_PROGRESS = "inProgress",
  OUT_FOR_DELIVERY = "outForDelivery",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}
export enum categoryOfFood {
  st = "STARTER",
  mc = "MAIN_COURSE",
  ds = "DESSERTS",
  dr = "DRINKS",
  ex = "EXTRAS",
}
