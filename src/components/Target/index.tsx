import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { styles } from './style';
import { MaterialIcons } from '@expo/vector-icons';

export type TargetProps = {
  id?: string;
  name: string;
  percentage: string;
  current: string;
  target: string;
};

type Props = TouchableOpacityProps & {
  data: TargetProps;
};

export function Target({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}></TouchableOpacity>
  );
}
