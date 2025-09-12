import { ActivityIndicator } from "react-native";
import { colors } from "@/theme/colors";
import { styles } from "./style";

export function Loading() {
    return (
        <ActivityIndicator color={colors.blue[500]} style={styles.container} size={34} />
    )
}
