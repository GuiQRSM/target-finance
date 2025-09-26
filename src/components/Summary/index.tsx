import { View, ColorValue, Text } from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';

export type SummaryProps = {
  label: string;
  value: string;
};

export type Props = {
  data: SummaryProps;
  icon: {
    name: keyof typeof MaterialIcons.glyphMap;
    color: ColorValue;
  };
  isRight?: boolean;
};

export function Summary({ data, icon, isRight = false }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, isRight && { justifyContent: 'flex-end' }]}>
        <MaterialIcons name={icon.name} size={16} color={icon.color} />
        <Text style={styles.label}>{data.label}</Text>
      </View>

      <Text style={styles.value}>{data.value}</Text>
    </View>
  );
}
