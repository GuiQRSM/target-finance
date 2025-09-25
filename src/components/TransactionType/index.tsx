import { View } from 'react-native';
import { colors } from '@/theme';
import { styles } from './style';
import { Option } from './option';
import { TransactionType } from '@/utils/TransactionTypes';

type Props = {
  selected: TransactionType;
  onChange: (type: TransactionType) => void;
};

export function TransactionTypes({ selected, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Option
        icon="arrow-upward"
        title="Guardar"
        isSelected={selected === TransactionType.Input}
        selectedColor={colors.blue[500]}
      />
      <Option
        icon="arrow-downward"
        title="Resgatar"
        isSelected={selected === TransactionType.Output}
        selectedColor={colors.red[400]}
      />
    </View>
  );
}
