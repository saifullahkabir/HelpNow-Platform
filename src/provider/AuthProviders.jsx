/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosCommon from "../hooks/useAxiosCommon";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosCommon = useAxiosCommon();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,  
            photoURL: photo
        })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email: userEmail};
            setUser(currentUser);
            setLoading(false);
            // if user exists then issue a token
            // if(currentUser) {
            //     const { data } = axiosCommon.post(`/jwt`, loggedUser)
            //     console.log('loggedUser', data);
            // }
            if (currentUser) {
                axiosCommon.post(`/jwt`, loggedUser)
                    .then(res => {
                        console.log('logged user:', res.data);
                    })
            }
            else{
                axiosCommon.post(`/logout`, loggedUser)
                .then(res => {
                     console.log(res.data);
                })
            }
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        updateUserProfile,
        logOut,
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;