import { useSQLiteContext } from 'expo-sqlite';

export type TargetProps = {
  name: string;
  amount: number;
};

export type TargetResponse = {
  id: number;
  name: string;
  amount: number;
  current: number;
  percentage: number;
  created_at: Date;
  updateda_at: Date;
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

  function listSavedByValue() {
    return database.getAllAsync<TargetResponse>(`
      SELECT 
      targets.id,
      targets.name,
      targets.amount,
      COALESCE(SUM(transactions.amount), 0) AS current
      FROM targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      GROUP BY   targets.id, targets.name, targets.amount
      `);
  }

  return {
    create,
    listSavedByValue,
  };
}
