import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import { colors } from '@/theme';
import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  isProcessing?: boolean;
};

export function Button() {}
