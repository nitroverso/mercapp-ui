// components
import Input, { InputSizes } from "./BaseInput";
// hooks
import { useFormContext } from "@/app/ui/components/form/Form";

interface SelectInputProps {
  isRequired?: boolean;
  label: string;
  name: string;
  options: { label: string; value: string }[];
  size?: InputSizes;
}

const SelectInput: React.FC<SelectInputProps> = (props) => {
  const { control } = useFormContext();

  return <Input {...props} control={control} />;
};

export default SelectInput;
