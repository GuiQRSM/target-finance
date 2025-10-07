import { useSQLiteContext } from 'expo-sqlite';

export function useTransactionsDatabase() {
  const database = useSQLiteContext();
}
