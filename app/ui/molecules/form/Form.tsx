import { Children, cloneElement } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
}

const Form = <T extends FieldValues>({
  children,
  onSubmit,
}: FormProps<T>): React.ReactElement => {
  const methods = useForm<T>();
  const handleSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form noValidate className="w-full" onSubmit={handleSubmit}>
        {Children.map(children, (child) =>
          cloneElement(child as React.ReactElement, {
            control: methods.control,
          })
        )}
      </form>
    </FormProvider>
  );
};

export default Form;
