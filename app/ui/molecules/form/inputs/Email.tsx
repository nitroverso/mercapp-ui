import { Control } from "react-hook-form";
import Input from "./Input";

interface EmailProps {
  name: string;
  label: string;
  control?: Control;
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
