import { View, Text } from 'react-native';
import Input, { CurrencyInputProps } from 'react-native-currency-input';
import { styles } from './styles';
import { colors } from '@/theme';

type Props = CurrencyInputProps & {
  label: string;
};

export function InputCurrency({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>

      <Input
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </View>
  );
}
