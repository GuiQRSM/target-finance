import { View, Text, Button } from "react-native"
import { router, useLocalSearchParams } from "expo-router"

export default function InProgress() {
const params = useLocalSearchParams<{id: string}>()

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>InProgress: {params.id}</Text>

            <Button title="voltar" onPress={() => router.back()} />
        </View>
    )
}