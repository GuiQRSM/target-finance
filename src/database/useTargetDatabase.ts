export type TargetProps = {
  name: string;
  amount: number;
};

export function useTargetsDatabase() {
  async function create(data: TargetProps) {}

  return {
    create,
  };
}
