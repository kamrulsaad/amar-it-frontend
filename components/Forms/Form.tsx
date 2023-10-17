'use-client'
import { ReactElement, useEffect } from 'react'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  DefaultValues,
} from 'react-hook-form'

type FormConfig<T> = {
  defaultValues?: DefaultValues<T>
  resolver?: any
}

type FormProps<T extends FieldValues> = {
  children?: React.ReactNode | ReactElement
  onSubmit: SubmitHandler<T>
  defaultValues?: DefaultValues<T>
} & FormConfig<T>

function Form<T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: FormProps<T>) {
  const formConfig: FormConfig<T> = {}

  if (defaultValues) {
    formConfig.defaultValues = defaultValues
  }

  if (resolver) {
    formConfig.resolver = resolver
  }

  const methods = useForm<T>(formConfig)
  const { handleSubmit, reset } = methods

  const handleFormSubmit = (data: T) => {
    onSubmit(data)
    reset()
  }

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>{children}</form>
    </FormProvider>
  )
}

export default Form
