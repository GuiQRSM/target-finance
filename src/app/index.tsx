import { View } from 'react-native';
import { HomeHeader } from '@/components/HomeHeader';
import { Target } from '@/components/Target';
import { List } from '@/components/List';
import { Button } from '@/components/Butoon';
import { router } from 'expo-router';

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
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />
      <List
        data={targets}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        title="Metas"
        keyExtractor={(item) => item.id}
        emptyMessage="Nenhuma meta. Toque em uma nova meta para criar"
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingHorizontal: 32 }}>
        <Button title="Nova Meta" onPress={() => router.navigate('/target')} />
      </View>
    </View>
  );
}
