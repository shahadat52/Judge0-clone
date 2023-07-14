import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

export const AuthContext = createContext()

const auth = getAuth(app);

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const updateUser = (userInfo) =>{
        return updateProfile(auth.currentUser, userInfo)
    };

    const loginWithEmailAndPassword = (email, password) => {
        // setLoader(true)
        // setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const LogOut = () => {
        return signOut(auth);
    }

  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
        });
        return () => unsubscribe()
    }, [user])

    const authInfo = {
        createUser,
        updateUser,
        loginWithEmailAndPassword,
        LogOut,
        user
    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default ContextProvider;