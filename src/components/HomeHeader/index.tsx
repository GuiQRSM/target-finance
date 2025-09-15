import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';
import { styles } from './styles';

export function HomeHeader() {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
      </View>
    </LinearGradient>
  );
}
