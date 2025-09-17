import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { styles } from './style';
import { MaterialIcons } from '@expo/vector-icons';

export type TargetProps = TouchableOpacityProps & {
  id?: string;
  name: string;
  percentage: string;
  current: string;
  target: string;
};

type Props = {
  data: TargetProps;
};

export function Target({ data }: Props) {
  return;
}
