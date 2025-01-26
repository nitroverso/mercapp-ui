// components
import Input, { InputSizes } from "./BaseInput";
// hooks
import { useFormContext } from "@/app/ui/components/form/Form";

interface EmailProps {
  isRequired?: boolean;
  label: string;
  name: string;
  size?: InputSizes;
}

const Email: React.FC<EmailProps> = (props) => {
  const { control } = useFormContext();

  return <Input {...props} control={control} />;
};

export default Email;
