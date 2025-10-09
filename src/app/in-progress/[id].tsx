import { View, Alert } from 'react-native';
import { PageHeader } from '@/components/pageHeader';
import { Progress } from '@/components/Progress';
import { List } from '@/components/List';
import { Button } from '@/components/Butoon';
import { Loading } from '@/components/Loading';

import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import dayjs from 'dayjs';

import { Transaction, TransactionProps } from '@/components/Transaction';
import { numberToCurrency } from '@/utils/numberToCurrency';
import { TransactionType } from '@/utils/TransactionTypes';

import { useTargetsDatabase } from '@/database/useTargetDatabase';
import { useTransactionsDatabase } from '@/database/useTransactionsDatabase';

export default function InProgress() {
  const [details, setDetails] = useState({
    name: '',
    current: 'R$ 0,00',
    target: 'R$ 0, 00',
    percentage: 0,
  });
  const [isFetching, setIsFetching] = useState(true);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const params = useLocalSearchParams<{ id: string }>();
  const targetsDatabase = useTargetsDatabase();
  const transactionsDatabase = useTransactionsDatabase();

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

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.listByTargetId(
        Number(params.id)
      );

      setTransactions(
        response.map((item) => ({
          id: String(item.id),
          value: numberToCurrency(item.amount),
          date: dayjs(item.created_at).format('DD/MM/YYYY [ás] HH:mm'),
          description: item.observation,
          type:
            item.amount < 0 ? TransactionType.Output : TransactionType.Input,
        }))
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as transações.');
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();
    const fetchTransactionsPromise = fetchTransactions();

    await Promise.all([fetchDetailsPromise, fetchTransactionsPromise]);
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
          onPress: () => router.navigate(`/target?id=${params.id}`),
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
