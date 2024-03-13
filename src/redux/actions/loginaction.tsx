import { Login_Success, Login_Failure,Set_Role, Log_out, Set_userId } from "../actiontypes/loginactiontypes";

export const loginSuccess = () => {
  return { type: Login_Success };
};

export const loginFailure = () => {
  return { type: Login_Failure };
};
export const setRole = (role: string) => {
    return { type: Set_Role, payload: role };
  };
  export const logOut = () => {
    return { type: Log_out};
  };
  export const Set_UserId=(userId:number)=>{
    return { type:Set_userId, payload:userId};
  }