import type { Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';

export enum FormFieldType {
  INPUT = 'input',
  PASSWORD = 'password',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  SWITCH = 'switch',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

type CustomProps = {
  control: Control<any>;
  name: string;
  label?: React.ReactNode;
  placeholder?: string;
  icon?: React.ReactNode;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  max?: number;
  min?: number;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
  className?: string;
};

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input
            placeholder={props.placeholder}
            {...field}
            className={cn(props.className)}
          />
        </FormControl>
      );
    case FormFieldType.PASSWORD:
      return (
        <FormControl>
          <Input
            type="password"
            placeholder={props.placeholder}
            {...field}
            className={cn(props.className)}
          />
        </FormControl>
      );
    case FormFieldType.NUMBER:
      return (
        <FormControl>
          <Input
            type="number"
            max={props.max}
            min={props.min}
            placeholder={props.placeholder}
            {...field}
            className={cn(props.className)}
          />
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            disabled={props.disabled}
            className={cn(props.className)}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className={cn(props.className)}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select
            onValueChange={(value: any) => {
              field.onChange(value);
              props.onValueChange && props.onValueChange(value);
            }}
            defaultValue={field.value.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={props.placeholder}
                  defaultValue={field.value}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    case FormFieldType.SWITCH:
      return (
        <FormControl>
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={props.disabled}
            className={cn(props.className)}
          />
        </FormControl>
      );
    default:
      return null;
  }
};

const DynamicFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default DynamicFormField;
