import { useSQLiteContext } from 'expo-sqlite';

export type TransactionCreate = {
  target_id: number;
  amount: number;
  observation?: string;
};

export function useTransactionsDatabase() {
  const database = useSQLiteContext();

  async function create(data: TransactionCreate) {}

  return {
    create,
  };
}
