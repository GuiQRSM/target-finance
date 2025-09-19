import { View } from 'react-native';
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
