import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';
import { styles } from './styles';
import { Separator } from '../Separator';
import { Summary } from '../Summary';

type HomeHeaderProps = {
  total: string;
};

type Props = {
  data: HomeHeaderProps;
};

export function HomeHeader({ data }: Props) {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>

      <Separator color={colors.blue[400]} />

      <View style={styles.summary}>
        <Summary
          data={{ label: 'Entradas', value: 'R$ 6,184.90' }}
          icon={{ name: 'arrow-upward', color: colors.green[500] }}
        />

        <Summary
          isLeft
          data={{ label: 'Saídas', value: '-R$ 883.65' }}
          icon={{ name: 'arrow-downward', color: colors.red[400] }}
        />
      </View>
    </LinearGradient>
  );
}
