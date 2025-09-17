import {
  FlatList,
  FlatListProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './style';
import { colors } from '@/theme';

type Props<T> = FlatListProps<T> & {
  title: string;
  emptyMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function List<T>({
  title,
  emptyMessage,
  containerStyle,
  data,
  renderItem,
  ...rest
}: Props<T>) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <FlatList data={data} renderItem={renderItem} {...rest} />
    </View>
  );
}
