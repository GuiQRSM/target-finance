import { View, Button } from 'react-native';
import { router } from 'expo-router';
import { PageHeader } from '@/components/pageHeader';

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
        rightButtom={{
          icon: 'edit',
          onPress: () => {},
        }}
      />
    </View>
  );
}
