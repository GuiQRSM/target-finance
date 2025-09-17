import { View } from 'react-native';
import { HomeHeader } from '@/components/HomeHeader';
import { Target } from '@/components/Target';
import { colors } from '@/theme';
import { List } from '@/components/List';

const summary = {
  total: 'R$ 2.680,00',
  input: { label: 'Entradas', value: 'R$ 6,184.90' },
  output: { label: 'Saídas', value: '-R$ 883.65' },
};

const targets = [
  {
    id: '1',
    name: 'Apple Watch',
    percentage: '50%',
    current: ' R$ 580,00',
    target: 'R$ 1.790,00',
  },
  {
    id: '2',
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
      <List
        data={targets}
        renderItem={({ item }) => <Target data={item} />}
        title="Metas"
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
