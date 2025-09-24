import { View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { PageHeader } from '@/components/pageHeader';
import { InputCurrency } from '@/components/InputCurrency';
import { Input } from '@/components/Input';
import { Button } from '@/components/Butoon';

export default function Transaction() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar"
      />
    </View>
  );
}
