interface UserCredentials {
    email: string;
    passwords: string;
  }
  
  interface Action {
    type: string;
    payload?: any;
  }
  export const LoginStart = (users: UserCredentials): Action => ({
    type: "LOGIN_START",
  });
  
  export const LoginSuccess = (users: any): Action => ({
    type: "LOGIN_SUCCESS",
    payload: users,
  });
  export const UPDATE_USER_FROM_STORAGE = (users: any): Action => ({
    type: "UPDATE_USER_FROM_STORAGE",
    payload: users,
  });
  export const LoginFailure = (error: any): Action => ({
    type: "LOGIN_FAILURE",
    payload: error,
  });
  
 