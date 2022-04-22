import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useToast } from "react-native-toast-notifications";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ToastAndroid } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}, {navigation}) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password)
                        .then(() => {
                            ToastAndroid.show("logged in successfully", ToastAndroid.LONG);
                        })
                        .catch (error=>{
                            if (String(error).includes('[auth/user-not-found]') || String(error).includes('[auth/wrong-password]')) {
                                ToastAndroid.show("incorrect credentials", ToastAndroid.LONG);
                            } else {
                                ToastAndroid.show("failed to log in", ToastAndroid.LONG);
                            }
                            console.log(error);
                        });
                    } catch (e) {
                        console.log(e);
                    }
                },
                googleLogin: async () => {
                    try {
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn();

                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(googleCredential);

                        ToastAndroid.show("logged in with google successfully", ToastAndroid.LONG);
                    } catch (e) {
                        console.log(e);
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            ToastAndroid.show("registration successful", ToastAndroid.LONG);
                        })
                        .catch (error=>{
                            if (String(error).includes('[auth/email-already-in-use]')) {
                                ToastAndroid.show("email already in use", ToastAndroid.LONG);
                            } else {
                                ToastAndroid.show("an error occured while registering", ToastAndroid.LONG);
                            }
                            console.log(error);
                        });
                    } catch (e) {
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut()
                        .then(() => {
                            ToastAndroid.show("logged out successfully", ToastAndroid.LONG);
                        })
                        .catch (error=>{
                            ToastAndroid.show("an error occured while logging out", ToastAndroid.LONG);
                            console.log(error);
                        });
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        await GoogleSignin.revokeAccess();
                        await GoogleSignin.signOut();
                    } catch (err) {
                        console.log('logging out of google-- ', err);
                    }
                },
            }}>
            {children}
        </AuthContext.Provider>
    );
}