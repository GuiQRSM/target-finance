import { View } from 'react-native';
import { useState } from 'react';
import { TransactionType } from '@/utils/TransactionTypes';
import { useLocalSearchParams } from 'expo-router';
import { PageHeader } from '@/components/pageHeader';
import { InputCurrency } from '@/components/InputCurrency';
import { Input } from '@/components/Input';
import { Button } from '@/components/Butoon';
import { TransactionTypeSwitch } from '@/components/TransactionType';

export default function Transaction() {
  const [type, setType] = useState(TransactionType.Input);
  const [isCreating, setIsCreating] = useState(false);
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar"
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionTypeSwitch selected={type} onChange={setType} />
        <InputCurrency label="Valor (R$)" value={0} />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
        />
        <Button title="Salvar" isProcessing={isCreating} />
      </View>
    </View>
  );
}
