import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { fontFamily } from "@/theme/fontFamily";

export default function Index() {

    
    return (
        <View style= {{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <Text style={{padding: 16, fontFamily: fontFamily.bold }}>Olá, Expo Router</Text>

            <Button  title="navegar" onPress={() => router.navigate("/target")} />
            <View style={{padding: 4}}/>
           <Button title="Transação" onPress={() => router.navigate("/transaction/8")}/>
            <View style={{padding: 4}}/>
            <Button title="Progresso" onPress={() => router.navigate("/in-progress/12")}/>
        </View>
    )
}