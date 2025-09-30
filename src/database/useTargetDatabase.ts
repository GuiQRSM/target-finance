import { useSQLiteContext } from 'expo-sqlite';

export type TargetProps = {
  name: string;
  amount: number;
};

export function useTargetsDatabase() {
  const database = useSQLiteContext();

  async function create(data: TargetProps) {
    const statement = await database.prepareAsync(
      'INSERT INTO targets (name, amount) VALUES ($name, $amount)'
    );

    statement.executeAsync({
      $name: data.name,
      $amount: data.amount,
    });
  }

  return {
    create,
  };
}
