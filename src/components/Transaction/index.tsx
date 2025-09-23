import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { styles } from './styles';
import { TransactionType } from '@/utils/TransactionTypes';

type TransactionProps = {
  id: string;
  value: string;
  date: string;
  description?: string;
  type: TransactionType;
};

export function Transaction() {
  return;
}
