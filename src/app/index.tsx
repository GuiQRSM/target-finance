import { useCallback, useState } from 'react';
import { useTargetsDatabase } from '@/database/useTargetDatabase';
import { View, StatusBar, Alert } from 'react-native';
import { HomeHeader } from '@/components/HomeHeader';
import { Target, TargetProps } from '@/components/Target';
import { List } from '@/components/List';
import { Button } from '@/components/Butoon';
import { router, useFocusEffect } from 'expo-router';
import { Loading } from '@/components/Loading';

const summary = {
  total: 'R$ 2.680,00',
  input: { label: 'Entradas', value: 'R$ 6,184.90' },
  output: { label: 'Saídas', value: '-R$ 883.65' },
};

export default function Index() {
  const targetDatabase = useTargetsDatabase();
  const [targets, setTargets] = useState<TargetProps[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listSavedByValue();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: String(item.current),
        percentage: item.percentage.toFixed(0) + '%',
        target: String(item.amount),
      }));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as metas');
      console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();

    const [targetData] = await Promise.all([targetDataPromise]);

    setTargets(targetData);
    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
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
