// reducers.ts
 import { Login_Success, Login_Failure,Set_Role, Log_out, Set_userId } from "../actiontypes/loginactiontypes";

interface AuthState {
  isAuthenticated: boolean;
  role: string | null;
  userId:number|null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  role: null,
  userId:null,
};



const LoginReducres = (state = initialState, action: any) => {
  switch (action.type) {
    case Login_Success:
      return {
        ...state,
        isAuthenticated: true,
      };
    case Login_Failure:
      return {
        ...state,
        isAuthenticated: false,
      };
    case Set_Role:
      return {
        ...state,
        role: action.payload,
      };
      case Log_out:
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
        role: null,
        

      };
        case Set_userId :
            return{
                ...state,
                userId:action.payload,
            }
    default:
      return state;
  }
};

export default LoginReducres;
