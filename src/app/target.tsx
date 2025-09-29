import { useState } from 'react';
import { View } from 'react-native';
import { PageHeader } from '@/components/pageHeader';
import { Input } from '@/components/Input';
import { InputCurrency } from '@/components/InputCurrency';
import { Button } from '@/components/Butoon';

export default function Target() {
  const [isProcessing, SetIsProcessing] = useState(false);
  const [name, SetName] = useState('');
  const [amount, SetAmount] = useState(0);

  function handleSave() {}

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da Meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
          onChangeText={SetName}
          value={name}
        />

        <InputCurrency
          label="Valor alvo (R$)"
          value={amount}
          onChangeValue={SetAmount}
        />

        <Button
          title="Salvar"
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
