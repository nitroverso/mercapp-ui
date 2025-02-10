import { createContext, useContext, useEffect } from "react";
import {
  FormProvider,
  FieldValues,
  UseFormReturn,
  SubmitHandler,
  useForm,
  DefaultValues,
  Path,
} from "react-hook-form";

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  defaultValues?: DefaultValues<T>;
  updatedValues?: Partial<DefaultValues<T>>;
  onSubmit: SubmitHandler<T>;
  onSuccess?: () => void;
  onFailure?: (error: unknown) => void;
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
  updatedValues,
  onSubmit,
  onSuccess,
  onFailure,
}: FormProps<T>) => {
  const methods = useForm<T>({ defaultValues });
  const handleSubmit = methods.handleSubmit(async (values) => {
    try {
      await onSubmit(values);
      methods.reset();
      onSuccess?.();
    } catch (error) {
      onFailure?.(error);
    }
  });

  useEffect(() => {
    if (updatedValues) {
      Object.keys(updatedValues).forEach((name) => {
        methods.setValue(name as Path<T>, updatedValues[name]!);
      });
    } else {
      methods.reset();
    }
  }, [JSON.stringify(updatedValues)]);

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
