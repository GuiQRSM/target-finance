import { View, Text, ColorValue } from 'react-native';
import { styles } from './styles';

export type SummaryProps = {
  label: string;
  value: string;
};

type Props = {
  data: SummaryProps;
};

export function Summary({ data }: Props) {}
