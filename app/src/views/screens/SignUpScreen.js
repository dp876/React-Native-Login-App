import React, { useContext } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    TextInput, 
    Image, 
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {AuthContext} from '../../authentication/AuthProvider';
import COLORS from '../../consts/color';
import STYLES from '../../styles';

function SignUpScreen({navigation}) {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [confirmPassword, setConfirmPassword] = React.useState();

    const { register, googleLogin } = useContext(AuthContext);

    const onPressRegister= () => {
        if (email == null || password == null){
            ToastAndroid.show("please enter email and/or password", ToastAndroid.LONG);
            return;
        }
        if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))){
            ToastAndroid.show("invalid email format", ToastAndroid.LONG);
            return;
        }
        register(email, password);
    }

    return (
        <SafeAreaView style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.dark }}>dp</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.secondary }}>876</Text>
                </View>
                <View style={{ marginTop: 70 }}>
                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: COLORS.dark }}>
                        Welcome Back,
                    </Text>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: COLORS.light }}>
                        Sign up to continue
                    </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={STYLES.inputContainer}>
                        <Icon
                            name="mail-outline"
                            size={20}
                            color={COLORS.light}
                            style={STYLES.inputIcon}
                        />
                        <TextInput
                            placeholder='Email'
                            style={STYLES.input}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={STYLES.inputContainer}>
                        <Icon
                            name="lock-outline"
                            size={20}
                            color={COLORS.light}
                            style={STYLES.inputIcon}
                        />
                        <TextInput
                            placeholder='Password'
                            style={STYLES.input}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity onPress={()=>onPressRegister()} style={STYLES.btnPrimary}>
                        <Text
                            style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 18 }}>Sign Up</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            marginVertical: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <View style={STYLES.line}></View>
                        <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>OR</Text>
                        <View style={STYLES.line}></View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                        <TouchableOpacity style={STYLES.btnSecondary}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Sign up with</Text>
                            <Image style={STYLES.btnImage} source={require("../../asset/facebook.png")} />
                        </TouchableOpacity>
                        <View style={{ width: 10 }} />
                        <TouchableOpacity onPress={() => googleLogin()} style={STYLES.btnSecondary}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Sign up with</Text>
                            <Image style={STYLES.btnImage} source={require("../../asset/google.png")} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        marginTop: 40,
                        marginBottom: 20,
                    }}>
                    <Text style={{ color: COLORS.light, fontWeight: 'bold' }}>Already have an account?</Text>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Text style={{ color: COLORS.pink, fontWeight: 'bold' }}> Sign in</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignUpScreen;