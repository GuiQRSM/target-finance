import { useSQLiteContext } from 'expo-sqlite';

export type TargetProps = {
  name: string;
  amount: number;
};

export type TargetUpdate = TargetProps & {
  id: number;
};

export type TargetResponse = {
  id: number;
  name: string;
  amount: number;
  current: number;
  percentage: number;
  created_at: Date;
  updated_at: Date;
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
      COALESCE(SUM(transactions.amount), 0) AS current,
      COALESCE((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage,
      targets.created_at,
      targets.updated_at
      FROM targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      GROUP BY   targets.id, targets.name, targets.amount
      ORDER BY current DESC
      `);
  }

  function show(id: number) {
    return database.getFirstAsync<TargetResponse>(`
      SELECT 
      targets.id,
      targets.name,
      targets.amount,
      COALESCE(SUM(transactions.amount), 0) AS current,
      COALESCE((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage,
      targets.created_at,
      targets.updated_at
      FROM targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      WHERE targets.id = ${id}
      `);
  }

  async function update(data: TargetUpdate) {
    const statement = await database.prepareAsync(`
      UPDATE targets SET
        name = $name,
        amount = $amount,
        updated_at = CURRENT_TIMESTAMP,
      WHERE id = $id
      `);

    statement.executeAsync({
      $id: data.id,
      $name: data.name,
      $amount: data.amount,
    });
  }

  return {
    create,
    listSavedByValue,
    show,
    update,
  };
}
