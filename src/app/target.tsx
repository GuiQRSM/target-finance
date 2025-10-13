import { View, Alert, StatusBar } from 'react-native';
import { PageHeader } from '@/components/pageHeader';
import { Input } from '@/components/Input';
import { InputCurrency } from '@/components/InputCurrency';
import { Button } from '@/components/Butoon';

import { useState, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';

import { useTargetsDatabase } from '@/database/useTargetDatabase';

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
      SetIsProcessing(false);
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

  function handleRemove() {
    if (!params.id) {
      return;
    }

    Alert.alert('Remover', 'Deseja realmente remover?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: remove },
    ]);
  }

  async function remove() {
    try {
      SetIsProcessing(true);

      await targetDatabase.remove(Number(params.id));
      Alert.alert('Meta', 'Meta removida!', [
        {
          text: 'Ok',
          onPress: () => router.replace('/'),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover');
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
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
        rightButtom={
          params.id ? { icon: 'delete', onPress: handleRemove } : undefined
        }
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
