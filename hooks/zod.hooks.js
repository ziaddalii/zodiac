/** Hook for zod validation */
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useZod = (schema, defaultValues, onFormSubmit, with_refine) => {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(
      with_refine ? with_refine(z.object(schema)) : z.object(schema)
    ),
    defaultValues,
  });

  return {
    watch,
    reset,
    setValue,
    getValues,
    errors,
    control: control,
    onSubmit: handleSubmit((d) => onFormSubmit(d)),
  };
};
