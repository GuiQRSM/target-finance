import { View, StatusBar, Alert } from 'react-native';
import { HomeHeader, HomeHeaderProps } from '@/components/HomeHeader';
import { Target, TargetProps } from '@/components/Target';
import { numberToCurrency } from '@/utils/numberToCurrency';
import { List } from '@/components/List';
import { Button } from '@/components/Butoon';
import { Loading } from '@/components/Loading';

import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { useTargetsDatabase } from '@/database/useTargetDatabase';
import { useTransactionsDatabase } from '@/database/useTransactionsDatabase';

export default function Index() {
  const [summary, setSummary] = useState<HomeHeaderProps>();
  const [targets, setTargets] = useState<TargetProps[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const targetDatabase = useTargetsDatabase();
  const transactionsDatabase = useTransactionsDatabase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listSavedByValue();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + '%',
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as metas');
      console.log(error);
    }
  }

  async function fetchSummary(): Promise<HomeHeaderProps> {
    try {
    } catch (error) {}
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
