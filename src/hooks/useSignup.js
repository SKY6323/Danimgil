import { useState } from 'react';
import { appAuth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    //에러정보를 저장
    const [error, setError] = useState(null);
    //현재 서버와 통신 중인 상태
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    //signup 훅을 생성/email, password, displayName -> 매개변수로 전달
    const signup = (email, password, displayName) => {
        setError(null) //아직 에러가 없으므로 null
        setIsPending(true); //서버와 통신중

        //비밀번호 절정으로 유저 정보를 등록 -> import
        createUserWithEmailAndPassword(appAuth, email, password)
        .then((userCredential)=> {
            //signd in
            const user = userCredential.user;
            console.log(user)

            //회원정보를 정상적으로 받지 못한 경우
            if (!user) {
                throw new Error('회원가입에 실패했습니다.')
            }

            //회원가입이 완료되고 유저정보에 닉네임을 업데이트합니다. (import 필요)
            updateProfile(appAuth.currentUser, {displayName}) 
            .then(() => {
                dispatch({type: 'login', payload: user})
                setError(null);
                setIsPending(false); //업데이트 완료 후 통신상태             
            }).catch((err) => {
                setError(err.message);
                setIsPending(false);
                console.log(err.message)
            })
        }) 
    }

    return { error, isPending, signup }
}