import { Alert, View } from 'react-native';
import { useState } from 'react';
import { TransactionType } from '@/utils/TransactionTypes';
import { router, useLocalSearchParams } from 'expo-router';
import { PageHeader } from '@/components/pageHeader';
import { InputCurrency } from '@/components/InputCurrency';
import { Input } from '@/components/Input';
import { Button } from '@/components/Butoon';
import { TransactionTypeSwitch } from '@/components/TransactionType';
import { useTransactionsDatabase } from '@/database/useTransactionsDatabase';

export default function Transaction() {
  const [amount, setAmount] = useState(0);
  const [observation, setObservation] = useState('');
  const [type, setType] = useState(TransactionType.Input);
  const [isCreating, setIsCreating] = useState(false);

  const params = useLocalSearchParams<{ id: string }>();
  const transactionDatabse = useTransactionsDatabase();

  async function handleCreate() {
    try {
      if (amount <= 0) {
        Alert.alert(
          'Atenção, preencha o valor. A transação deve ser maior que zero.'
        );
      }

      await transactionDatabse.create({
        target_id: Number(params.id),
        amount: type === TransactionType.Output ? amount * -1 : amount,
        observation,
      });
      Alert.alert('Sucesso', 'Transação salva com sucesso', [
        {
          text: 'ok',
          onPress: router.back,
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a transação');
      console.log(error);
      setIsCreating(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar"
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionTypeSwitch selected={type} onChange={setType} />
        <InputCurrency
          label="Valor (R$)"
          value={amount}
          onChangeValue={setAmount}
        />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
          onChangeText={setObservation}
        />
        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  );
}
