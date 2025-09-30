import { SQLiteDatabase } from 'expo-sqlite';

export type TargetProps = {
  name: string;
  amount: number;
};

export function useTargetsDatabase() {
  const database = SQLiteDatabase;

  async function create(data: TargetProps) {}

  return {
    create,
  };
}
