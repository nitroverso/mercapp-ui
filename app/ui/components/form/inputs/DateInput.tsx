// components
import Input, { InputSizes } from "./BaseInput";
// hooks
import { useFormContext } from "@/app/ui/components/form/Form";

interface DateInputProps {
  isRequired?: boolean;
  label: string;
  name: string;
  size?: InputSizes;
}

const DateInput: React.FC<DateInputProps> = (props) => {
  const { control } = useFormContext();

  return <Input {...props} isDate control={control} />;
};

export default DateInput;
