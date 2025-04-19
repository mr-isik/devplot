import type { DropzoneOptions } from 'react-dropzone';
import type { Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import { Button } from '../ui/button';

import { DatetimePicker } from '../ui/date-time-picker';
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from '../ui/file-upload';
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
  DATE = 'date',
  SKELETON = 'skeleton',
  FILE = 'file',
}

export type CustomProps = {
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
  options?: Array<{ value: string; label: string }>;
  fileOptions?: DropzoneOptions;
  description?: string;
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
            defaultValue={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={props.placeholder}
                  defaultValue={field?.value}
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
    case FormFieldType.DATE:
      return (
        <FormControl>
          <DatetimePicker
            value={field.value ? new Date(field.value) : undefined}
            onChange={(date) => {
              const dateValue = date ? date.toISOString() : '';
              field.onChange(dateValue);
            }}
            format={[
              ['months', 'days', 'years'],
              [],
            ]}
            className={cn(props.className)}
          />
        </FormControl>
      );
    case FormFieldType.FILE:
      return (
        <FormControl>
          <FileUploader
            value={field.value}
            onValueChange={field.onChange}
            dropzoneOptions={props.fileOptions ?? {
              accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] },
              maxFiles: 1,
              multiple: false,
            }}
            orientation="horizontal"
          >
            <FileInput className="border-2 border-dashed border-muted-foreground/20 bg-secondary/40 p-2">
              <Button variant="ghost" className="w-full">
                <Upload className="size-4" />
                <span>Upload</span>
              </Button>
            </FileInput>
            <FileUploaderContent>
              {
                field.value?.map((file: File, index: number) => (
                  <FileUploaderItem key={index} index={index} className="w-full px-2 py-1 active:scale-100">
                    {file.name}
                  </FileUploaderItem>
                ))
              }
            </FileUploaderContent>
          </FileUploader>
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
            <FormLabel className="block">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DynamicFormField;
