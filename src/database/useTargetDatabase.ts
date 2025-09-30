import { useSQLiteContext } from 'expo-sqlite';

export type TargetProps = {
  name: string;
  amount: number;
};

export function useTargetsDatabase() {
  const database = useSQLiteContext;

  async function create(data: TargetProps) {}

  return {
    create,
  };
}
