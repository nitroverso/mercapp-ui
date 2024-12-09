import { Control } from "react-hook-form";
import Input from "./Input";

interface PasswordProps {
  name: string;
  label: string;
  control?: Control;
}

const Password: React.FC<PasswordProps> = (props) => (
  <Input
    {...props}
    rules={{
      minLength: {
        message: "Password must be at least 6 characters long",
        value: 6,
      },
      required: "Password is required",
    }}
    type="password"
  />
);

export default Password;
