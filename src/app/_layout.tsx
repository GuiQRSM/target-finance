import { Stack } from "expo-router";
import { colors } from "@/theme/colors";
import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from "@expo-google-fonts/poppins"


export default function Layout() {

    const [fontIsLoaded] = useFonts({
         Poppins_400Regular, Poppins_500Medium, Poppins_700Bold
    })

    if(!fontIsLoaded) {
        return
    }

    return (
        <Stack screenOptions={{headerShown: false, contentStyle: {backgroundColor: colors.white}}} />
    )
}