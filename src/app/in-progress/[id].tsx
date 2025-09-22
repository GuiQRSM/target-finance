import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { PageHeader } from '@/components/pageHeader';

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
        rightButtom={{
          icon: 'edit',
          onPress: () => {},
        }}
      />
    </View>
  );
}
