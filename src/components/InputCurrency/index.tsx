import { View, Text } from 'react-native';
import Input, { CurrencyInputProps } from 'react-native-currency-input';
import { colors } from '@/theme';
import { styles } from './styles';

type Props = CurrencyInputProps & {
  label: string;
};

export function InputCurrency({ label, ...rest }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Input
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        value={0}
        {...rest}
      />
    </View>
  );
}
