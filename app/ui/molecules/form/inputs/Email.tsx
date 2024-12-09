import { Control } from "react-hook-form";
import Input, { InputSizes } from "./Input";

interface EmailProps {
  control?: Control;
  label: string;
  name: string;
  size?: InputSizes;
}

const Email: React.FC<EmailProps> = (props) => (
  <Input
    {...props}
    rules={{
      pattern: {
        message: "Invalid email address",
        value: /^\S+@\S+$/,
      },
      required: "Email is required",
    }}
    type="email"
  />
);

export default Email;
