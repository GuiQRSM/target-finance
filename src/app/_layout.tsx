import { Suspense } from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/theme/colors';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Loading } from '@/components/Loading';
import { SQLiteProvider } from 'expo-sqlite';
import { migrate } from '@/database/migrate';

export default function Layout() {
  const [fontIsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontIsLoaded) {
    return <Loading />;
  }

  return (
    <SQLiteProvider databaseName="target.db" onInit={migrate}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.white },
        }}
      />
    </SQLiteProvider>
  );
}
