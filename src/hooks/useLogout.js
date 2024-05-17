import { useState } from "react";
import { appAuth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    //useSignup 에서 사용하는 정보를 여기서도 활용
    //에러정보를 저장
    const [error, setError] = useState(null);
    //현재 서버와 통신 중인 상태
    const [isPending, setIsPending] = useState(false);
    //유저정보를 전역에서 활용할 수 있는 dispatch함수를 통해 업데이트
    //여기서는 유저의 상태를 로그아웃으로 업데이트
    const { dispatch } = useAuthContext();

    //로그아웃
    const logout = () => {
        setError(null);
        setIsPending(true);

        signOut(appAuth).then(() => {
        // Sign-out successful.
        dispatch({type: "logout"})
        setError(null);
        setIsPending(false);
      }).catch((error) => {
        // An error happened.
        setError(error.message);
        setIsPending(false);
        console.log(error.message)
      });
    }
    
    return { error, isPending, logout }
}