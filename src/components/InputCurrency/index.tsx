import { View, Text } from 'react-native';
import Input, { CurrencyInputProps } from 'react-native-currency-input';
import { colors } from '@/theme';
import { styles } from './styles';

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
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        {...rest}
      />
    </View>
  );
}
