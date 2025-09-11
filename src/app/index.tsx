import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Index() {

    
    return (
        <View style= {{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <Text style={{padding: 16}}>Olá, Expo Router</Text>

            <Button  title="navegar" onPress={() => router.navigate("/target")} />

            <View style={{padding: 4}}/>

           <Button title="ID transaction" onPress={() => router.navigate("/transaction/8")}/>
        </View>
    )
}