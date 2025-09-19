import { View, Text, TextInput, TextInputProps } from 'react-native';
import { colors } from '@/theme';
import { styles } from './style';

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, ...rest }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </View>
  );
}
