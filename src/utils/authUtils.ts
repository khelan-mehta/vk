// // authUtils.ts

// // Type definitions for API responses
// import { SignUpResponse, SignInResponse, RestaurantResponse } from "./types";

// // Type for stored auth data
// interface AuthData {
//   access_token: string;
//   _oid: string;
//   // _rid: string;
// }

// interface ResData {
//   _rid: string;
// }

// // Type for authentication headers
// interface AuthHeaders {
//   Authorization: string;
//   _oid: string;
//   // _rid: string;
// }

// // Constants for storage keys
// const STORAGE_KEYS = {
//   ACCESS_TOKEN: "access_token",
//   OID: "_oid",
//   RID: "_rid",
// } as const;

// type AuthType = "login" | "signup";

// /**
//  * Stores authentication data from API response
//  * @param {SignUpResponse | SignInResponse} response - API response from either login or signup
//  * @param {AuthType} type - Type of authentication response
//  * @returns {boolean} - Success status of storage operation
//  */
// export const storeAuthData = (
//   response: SignUpResponse | SignInResponse,
//   type: AuthType,
// ): boolean => {
//   try {
//     let authData: AuthData;

//     if (type === "login") {
//       const loginResponse = response as SignInResponse;
//       authData = {
//         access_token: loginResponse.access_token,
//         _oid: loginResponse._oid,
//         // _rid: loginResponse._rid,
//       };
//     } else {
//       const signupResponse = response as AuthData;
//       authData = {
//         access_token: signupResponse.access_token,
//         _oid: signupResponse._oid,
//         // _rid: signupResponse.token._rid,
//       };
//     }

//     // Store in localStorage
//     localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, authData.access_token);
//     localStorage.setItem(STORAGE_KEYS.OID, authData._oid);
//     // localStorage.setItem(STORAGE_KEYS.RID, authData._rid);

//     return true;
//   } catch (error) {
//     console.error("Error storing auth data:", error);
//     return false;
//   }
// };

// /**
//  * Retrieves authentication data from localStorage
//  * @returns {AuthData | null} Authentication data or null if not found
//  */
// export const getAuthData = (): AuthData | null => {
//   try {
//     const access_token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
//     const _oid = localStorage.getItem(STORAGE_KEYS.OID);
//     // const _rid = localStorage.getItem(STORAGE_KEYS.RID);

//     // Return null if any required field is missing
//     if (!access_token || !_oid) {
//       return null;
//     }

//     return {
//       access_token,
//       _oid,
//       // _rid,
//     };
//   } catch (error) {
//     console.error("Error retrieving auth data:", error);
//     return null;
//   }
// };

// /**
//  * Checks if user is authenticated
//  * @returns {boolean} Authentication status
//  */
// export const isAuthenticated = (): boolean => {
//   return getAuthData() !== null;
// };

// /**
//  * Clears authentication data from localStorage
//  * @returns {boolean} Success status of clear operation
//  */
// export const clearAuthData = (): boolean => {
//   try {
//     localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
//     localStorage.removeItem(STORAGE_KEYS.OID);
//     // localStorage.removeItem(STORAGE_KEYS.RID);
//     return true;
//   } catch (error) {
//     console.error("Error clearing auth data:", error);
//     return false;
//   }
// };

// /**
//  * Gets authentication headers for API calls
//  * @returns {AuthHeaders | null} Headers object or null if not authenticated
//  */
// export const getAuthHeaders = (): AuthHeaders | null => {
//   const authData = getAuthData();
//   if (!authData) return null;

//   return {
//     Authorization: `Bearer ${authData.access_token}`,
//     _oid: authData._oid,
//     // _rid: authData._rid,
//   };
// };

// // Optional: Type guard functions for response types
// export const isSignInResponse = (response: any): response is SignInResponse => {
//   return "access_token" in response && "_oid" in response;
// };

// export const isSignUpResponse = (response: any): response is SignUpResponse => {
//   return "message" in response && "owner" in response && "token" in response;
// };

// authUtils.ts

// Type definitions for API responses
import { SignUpResponse, SignInResponse, RestaurantResponse } from "./types";

// Type for stored auth data
interface AuthData {
  access_token: string;
  _oid: string;
  // _rid: string;
  _rid?: string;
}

interface ResData {
  _rid: string;
}

// Type for authentication headers
interface AuthHeaders {
  Authorization: string;
  _oid: string;
  _rid: string;
}

// Constants for storage keys
const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  OID: "_oid",
  RID: "_rid",
} as const;

type AuthType = "login" | "signup";

/**
 * Stores authentication data from API response
 * @param {SignUpResponse | SignInResponse} response - API response from either login or signup
 * @param {AuthType} type - Type of authentication response
 * @returns {boolean} - Success status of storage operation
 */
export const storeAuthData = (
  response: SignUpResponse | SignInResponse,
  type: AuthType,
): boolean => {
  try {
    let authData: any;

    if (type === "login") {
      const loginResponse = response as SignInResponse;
      authData = {
        access_token: loginResponse.access_token,
        _oid: loginResponse._oid,
        _rid: loginResponse._rid,
      };
    } else {
      const signupResponse = response as AuthData;
      authData = {
        access_token: signupResponse.access_token,
        _oid: signupResponse._oid,
        _rid: signupResponse._rid,
      };
    }

    // Store in localStorage
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, authData.access_token);
    localStorage.setItem(STORAGE_KEYS.OID, authData._oid);

    return true;
  } catch (error) {
    console.error("Error storing auth data:", error);
    return false;
  }
};

export const storeResData = (response: RestaurantResponse | any): boolean => {
  try {
    let resData: any;

    const RestaurantResponse = response as RestaurantResponse;
    resData = {
      _rid: RestaurantResponse._id,
    };

    // Store in localStorage
    localStorage.setItem(STORAGE_KEYS.RID, resData._rid);

    return true;
  } catch (error) {
    console.error("Error storing auth data:", error);
    return false;
  }
};

/**
 * Retrieves authentication data from localStorage
 * @returns {AuthData |null} Authentication data or null if not found
 */
export const getAuthData = (): AuthData | null => {
  try {
    const access_token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const _oid = localStorage.getItem(STORAGE_KEYS.OID);

    // Return null if any required field is missing
    if (!access_token || !_oid) {
      return null;
    }

    return {
      access_token,
      _oid,
    };
  } catch (error) {
    console.error("Error retrieving auth data:", error);
    return null;
  }
};

export const getResData = (): ResData | null => {
  try {
    const _rid = localStorage.getItem(STORAGE_KEYS.RID);
    if (!_rid) {
      return null;
    }
    return {
      _rid,
    };
  } catch (err) {
    console.error("Error retrieving auth data:", err);
    return null;
  }
};

/**
 * Checks if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = (): boolean => {
  return getAuthData() !== null;
};

export const isResAuthenticated = (): boolean => {
  return getResData() !== null;
};

/**
 * Clears authentication data from localStorage
 * @returns {boolean} Success status of clear operation
 */
export const clearAuthData = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.OID);
    localStorage.removeItem(STORAGE_KEYS.RID);
    return true;
  } catch (error) {
    console.error("Error clearing auth data:", error);
    return false;
  }
};

/**
 * Gets authentication headers for API calls
 * @returns {AuthHeaders | null} Headers object or null if not authenticated
 */
export const getAuthHeaders = (): AuthHeaders | null => {
  const authData = getAuthData() as any;
  if (!authData) return null;

  return {
    Authorization: `Bearer ${authData.access_token}`,
    _oid: authData._oid,
    _rid: authData._rid,
  };
};

// Optional: Type guard functions for response types
export const isSignInResponse = (response: any): response is SignInResponse => {
  return "access_token" in response && "_oid" in response;
};

export const isSignUpResponse = (response: any): response is SignUpResponse => {
  return "message" in response && "owner" in response && "token" in response;
};
