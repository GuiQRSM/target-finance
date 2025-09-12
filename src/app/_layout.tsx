import { Stack } from "expo-router";
import { colors } from "@/theme/colors";

export default function Layout() {
    console.log("Passou pelo layout primeiro")
    return (
        <Stack screenOptions={{headerShown: false, contentStyle: {backgroundColor: colors.white}}} />
    )
}