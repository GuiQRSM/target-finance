import { View, Alert } from 'react-native';
import { useCallback, useState } from 'react';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import { useTargetsDatabase } from '@/database/useTargetDatabase';
import { PageHeader } from '@/components/pageHeader';
import { Progress } from '@/components/Progress';
import { List } from '@/components/List';
import { Button } from '@/components/Butoon';
import { Loading } from '@/components/Loading';
import { Transaction, TransactionProps } from '@/components/Transaction';
import { numberToCurrency } from '@/utils/numberToCurrency';
import { TransactionType } from '@/utils/TransactionTypes';

const transactions: TransactionProps[] = [
  {
    id: '1',
    value: 'R$ 20,00',
    date: '12/04/25',
    type: TransactionType.Output,
  },
  {
    id: '2',
    value: 'R$ 300,00',
    date: '12/05/25',
    description: 'CDB de 110% no banco XPTO',
    type: TransactionType.Input,
  },
];

export default function InProgress() {
  const [details, setDetails] = useState({
    name: '',
    current: 'R$ 0,00',
    target: 'R$ 0, 00',
    percentage: 0,
  });
  const [isFetching, setIsFetching] = useState(true);
  const params = useLocalSearchParams<{ id: string }>();
  const targetsDatabase = useTargetsDatabase();

  async function fetchDetails() {
    try {
      const response = await targetsDatabase.show(Number(params.id));

      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível exibir detalhes da meta');
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();

    await Promise.all([fetchDetailsPromise]);
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
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButtom={{
          icon: 'edit',
          onPress: () => router.navigate(`target?id = ${params.id}`),
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
        emptyMessage='Nenhuma transação. toque em "nova transação" para adcionar'
      />
      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}
