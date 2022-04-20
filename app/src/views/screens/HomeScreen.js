import React, { useContext } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from '../../authentication/AuthProvider';
import COLORS from '../../consts/color';
import STYLES from '../../styles';

function HomeScreen({ navigation }) {

    const { logout } = useContext(AuthContext);

    return (
        <SafeAreaView style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.dark }}>dp</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.secondary }}>876</Text>
                </View>
                <View style={{ marginTop: 70 }}>
                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: COLORS.dark }}>
                        Home Screen
                    </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity onPress={() => logout()} style={STYLES.btnPrimary}>
                        <Text
                            style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 18 }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;