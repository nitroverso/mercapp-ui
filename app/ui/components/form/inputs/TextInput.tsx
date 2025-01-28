// components
import Input, { InputSizes } from "./BaseInput";
// hooks
import { useFormContext } from "@/app/ui/components/form/Form";

interface TextInputProps {
  isRequired?: boolean;
  label: string;
  name: string;
  size?: InputSizes;
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const { control } = useFormContext();

  return <Input {...props} control={control} />;
};

export default TextInput;
