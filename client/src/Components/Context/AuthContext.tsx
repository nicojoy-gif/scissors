import { createContext, useReducer, ReactNode, useEffect } from "react";

interface State {
  users: any;
  isFetching: boolean;
  errors: any;
}

interface Action {
  type: string;
  payload?: any;
}
const storedUser = localStorage.getItem("users");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

const INITIAL_STATE: State = {
  users: initialUser,
  isFetching: false,
  errors: null,
};


interface AuthContextType {
  users: any;
  isFetching: boolean;
  errors: boolean;
  dispatch: React.Dispatch<Action>;
}

export const AuthContext = createContext<AuthContextType>({
  users: null,
  isFetching: false,
  errors: false,
  dispatch: () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "LOGIN_START":
          return {
            ...state,
            users: {},
            isFetching: true,
            errors: false,
          };
         
        case "LOGIN_SUCCESS":
          return {
            ...state,
            users: action.payload,
            isFetching: false,
            errors: false,
          };
          
        case "UPDATE_USER_FROM_STORAGE":
          return {
            ...state,
            users: action.payload,
            isFetching: false,
            errors: false,
          };
      
        case "LOGIN_FAILURE":
          return {
            ...state,
            users: null,
            isFetching: false,
            errors: action.payload,
          };
          
        case "FOLLOW":
          return {
            ...state,
            users: {
              ...state.users,
              followings: [...state.users.followings, action.payload],
            },
          };
          
        case "UNFOLLOW":
          return {
            ...state,
            users: {
              ...state.users,
              followings: state.users.followings.filter(
                (following: any) => following !== action.payload
              ),
            },
          };

        default:
          return state;
      }
    },
    INITIAL_STATE
  );

  // Function to update local storage whenever users state changes
  const updateLocalStorage = (users: any) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  // Load users data from local storage on initial component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("users");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch({ type: "UPDATE_USER_FROM_STORAGE", payload: parsedUser });
    }
  }, []);

  // Update local storage whenever users state changes
  useEffect(() => {
    updateLocalStorage(state.users);
  }, [state.users]);

  return (
    <AuthContext.Provider
      value={{
        users: state.users,
        isFetching: state.isFetching,
        errors: state.errors,
        dispatch,
       
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContextProvider;