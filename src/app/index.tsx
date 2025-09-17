import { View } from 'react-native';
import { HomeHeader } from '@/components/HomeHeader';
import { Target } from '@/components/Target';
import { colors } from '@/theme';

const summary = {
  total: 'R$ 2.680,00',
  input: { label: 'Entradas', value: 'R$ 6,184.90' },
  output: { label: 'Saídas', value: '-R$ 883.65' },
};

const targets = [
  {
    name: 'Apple Watch',
    percentage: '50%',
    current: ' R$ 580,00',
    target: 'R$ 1.790,00',
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />
      <Target data={targets[0]} />
    </View>
  );
}
