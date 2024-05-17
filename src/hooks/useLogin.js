import { useState } from 'react';
import { appAuth } from '../firebase/config';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    //에러정보를 저장
    const [error, setError] = useState(null);
    //현재 서버와 통신 중인 상태
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    //signup 훅을 생성/email, password -> 매개변수로 전달
    const login = (email, password) => {
        setError(null) //아직 에러가 없으므로 null
        setIsPending(true); //서버와 통신중


        signInWithEmailAndPassword (appAuth, email, password)
        .then((userCredential)=> {
            //signd in
            const user = userCredential.user;
            dispatch({type: 'login', payload: user })
            //console.log(user)

            //로그인 정보를 정상적으로 받지 못한 경우
            if (!user) {
                throw new Error('로그인에 실패했습니다.')
            }            
        }) 
    }

    return { error, isPending, login }
}