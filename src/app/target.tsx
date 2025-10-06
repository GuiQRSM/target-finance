import { useState, useEffect } from 'react';
import { useTargetsDatabase } from '@/database/useTargetDatabase';
import { View, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { PageHeader } from '@/components/pageHeader';
import { Input } from '@/components/Input';
import { InputCurrency } from '@/components/InputCurrency';
import { Button } from '@/components/Butoon';

export default function Target() {
  const [isProcessing, SetIsProcessing] = useState(false);
  const [name, SetName] = useState('');
  const [amount, SetAmount] = useState(0);

  const params = useLocalSearchParams<{ id?: string }>();
  const targetDatabase = useTargetsDatabase();

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert(
        'Atenção',
        'Preencha nome e o valor precisa ser maior que zero'
      );
    }

    SetIsProcessing(true);

    if (params.id) {
      update();
    } else {
      create();
    }
  }

  async function create() {
    try {
      await targetDatabase.create({ name, amount });
      Alert.alert('Nova Meta', 'Meta criada com sucesso', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a meta');
      console.log(error);
      SetIsProcessing(false);
    }
  }

  async function update() {
    try {
      await targetDatabase.update({ id: Number(params.id), name, amount });
      Alert.alert('Sucesso', 'Meta atualizada com sucesso', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a meta.');
      console.log(error);
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id);
      SetName(response.name);
      SetAmount(response.amount);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes da meta');
      console.log(error);
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id));
    }
  }, [params.id]);

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
