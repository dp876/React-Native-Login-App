import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import { LogBox } from 'react-native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../authentication/AuthProvider';
import { AuthProvider } from '../authentication/AuthProvider';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();

const Routes = () => {
    LogBox.ignoreLogs([
        "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    ]);

    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        GoogleSignin.configure({
            webClientId: '1099344652345-snippjej3e7ebuoso79vq4toj4dbj1hm.apps.googleusercontent.com',
        }); 
        
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ header: () => null }}>
                {
                    user ? (
                        <>
                            <Stack.Screen name="HomeScreen" component={HomeScreen} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="SignIn" component={SignInScreen} />
                            <Stack.Screen name="SignUp" component={SignUpScreen} />
                        </>
                    )
                }
            </Stack.Navigator>
            </NavigationContainer>
    );
};

export default Routes;