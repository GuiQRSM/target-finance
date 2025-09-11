import { View, Text, Button } from "react-native"
import { useLocalSearchParams, router } from "expo-router"

export default function Transaction() {

    const params = useLocalSearchParams<{id: string}>()

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 26, fontWeight: 'bold', color: "black"}}>ID: {params.id}</Text>

            <Button title="voltar" onPress={() => router.back()}/>
        </View>
    )
}