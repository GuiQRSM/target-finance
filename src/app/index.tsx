import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Index() {

    
    return (
        <View style= {{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <Text>Olá, Expo Router</Text>
            <Button title="navegar" onPress={() => router.navigate("/target")} />
        </View>
    )
}