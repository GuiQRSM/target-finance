import { View } from 'react-native';
import { PageHeader } from '@/components/pageHeader';
import { Input } from '@/components/Input';
import { Button } from '@/components/Butoon';
import { InputCurrency } from '@/components/InputCurrency';

export default function Target() {
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
        />
        <InputCurrency label="test" value={0} />
        <Button title="Salvar" />
      </View>
    </View>
  );
}
