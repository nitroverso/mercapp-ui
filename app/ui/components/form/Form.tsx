import { createContext, useContext } from "react";
import {
  FormProvider,
  FieldValues,
  UseFormReturn,
  SubmitHandler,
  useForm,
  DefaultValues,
} from "react-hook-form";

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContext = createContext<UseFormReturn<any> | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a Form");
  }
  return context;
}

const Form = <T extends FieldValues>({
  children,
  defaultValues,
  onSubmit,
}: FormProps<T>) => {
  const methods = useForm<T>({ defaultValues });
  const handleSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <FormContext.Provider value={methods}>
        <form noValidate className="w-full" onSubmit={handleSubmit}>
          {children}
        </form>
      </FormContext.Provider>
    </FormProvider>
  );
};

export default Form;
