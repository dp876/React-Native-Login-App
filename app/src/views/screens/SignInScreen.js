import React, { useContext } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    TextInput, 
    Image, 
    TouchableOpacity, 
    Pressable,
    ToastAndroid 
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from '../../authentication/AuthProvider';
import COLORS from '../../consts/color';
import STYLES from '../../styles';

function SignInScreen({navigation}) {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    const { login, googleLogin } = useContext(AuthContext);

    const onPressLogin = () => {
        if (email == null || password == null){
            ToastAndroid.show("please enter email and/or password", ToastAndroid.LONG);
            return;
        }
        if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))){
            ToastAndroid.show("invalid email format", ToastAndroid.LONG);
            return;
        }
        login(email, password);
    }

    const onSignInFacebook = () => {
        ToastAndroid.show("facebook pressed", ToastAndroid.LONG);
    };

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
                        Sign in to continue
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
                            value={email}
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
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity onPress={()=>onPressLogin()} style={STYLES.btnPrimary}>
                        <Text
                            style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 18 }}>Sign In</Text>
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
                        <TouchableOpacity onPress={()=>onSignInFacebook()} style={STYLES.btnSecondary}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Sign in with</Text>
                            <Image style={STYLES.btnImage} source={require("../../asset/facebook.png")} />
                        </TouchableOpacity>
                        <View style={{ width: 10 }} />
                        <TouchableOpacity onPress={() => googleLogin()} style={STYLES.btnSecondary}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Sign in with</Text>
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
                    <Text style={{ color: COLORS.light, fontWeight: 'bold' }}>Don't have an account?</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                        <Text style={{ color: COLORS.pink, fontWeight: 'bold' }}> Sign up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignInScreen;