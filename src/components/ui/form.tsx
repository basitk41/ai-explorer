import * as React from 'react';
import {
  Controller,
  FormProvider,
  useFormContext,
  FieldValues,
  ControllerProps,
} from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { LabelProps } from '@radix-ui/react-label';

// Main form wrapper that provides form context to all children
const Form = FormProvider;

// Form field component that wraps form inputs with validation
const FormField = ({
  name,
  render,
  ...props
}: ControllerProps<FieldValues, string>) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState, formState }) => (
        <div className='space-y-2'>
          {render({ field, fieldState, formState })}
        </div>
      )}
      {...props}
    />
  );
};

// Form label component
const FormLabel = ({ className, children, ...props }: LabelProps) => {
  return (
    <Label className={cn('text-sm font-medium', className)} {...props}>
      {children}
    </Label>
  );
};

FormLabel.displayName = 'FormLabel';

// Form control component for input fields
const FormControl = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('relative', className)} {...props}>
      {children}
    </div>
  );
};

FormControl.displayName = 'FormControl';

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  name: string;
}
// Form message component for displaying errors
const FormMessage = ({ className, children, ...props }: FormMessageProps) => {
  const { formState } = useFormContext();
  const error = formState.errors[props.name];

  if (!error) return null;

  return (
    <p className={cn('text-sm text-red-500', className)} {...props}>
      {String(error.message)}
    </p>
  );
};

FormMessage.displayName = 'FormMessage';

const FormItem = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {children}
    </div>
  );
};

export { Form, FormField, FormLabel, FormControl, FormMessage, FormItem };
