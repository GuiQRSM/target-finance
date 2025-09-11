import { View, Text, Button } from 'react-native'
import { router } from "expo-router";

export default function Target() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Target</Text>
            <Button title='voltar' onPress={() => router.back()} />
        </View>
    )
}