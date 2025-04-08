'use client';

import type { PortfolioFormValues } from '@/lib/validations/portfolio';
import DynamicFormField, { FormFieldType } from '@/components/globals/DynamicFormField';
import { Card, CardContent } from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from 'react-hook-form';

export default function BasicInfoStep() {
  const form = useFormContext<PortfolioFormValues>();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <DynamicFormField
              control={form.control}
              name="content.hero_header"
              label="Hero Title"
              placeholder="E.g.: John Doe - Frontend Developer"
              fieldType={FormFieldType.INPUT}
              description="Enter the main title of your portfolio. Usually your name and title."
            />

            <DynamicFormField
              control={form.control}
              name="content.hero_description"
              label="Short Description"
              placeholder="E.g.: Frontend Developer with 5+ years of experience building user-focused interfaces"
              fieldType={FormFieldType.TEXTAREA}
              description="Enter a brief description that introduces you."
            />

            <FormField
              control={form.control}
              name="content.about_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Me Text</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe yourself, your skills, and your experiences in detail."
                      className="min-h-[200px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This text will be displayed in the "About Me" section. You can describe yourself, your skills, and career goals.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-medium">SEO Settings</h3>
          <div className="grid gap-6">
            <DynamicFormField
              control={form.control}
              name="content.meta_title"
              label="SEO Title"
              placeholder="E.g.: John Doe | Frontend Developer & UI Designer"
              fieldType={FormFieldType.INPUT}
              description="This title will be used in search engines and browser tabs."
            />

            <DynamicFormField
              control={form.control}
              name="content.meta_description"
              label="SEO Description"
              placeholder="E.g.: Professional portfolio of John Doe, a frontend developer specializing in React and UI design."
              fieldType={FormFieldType.TEXTAREA}
              description="A brief description of your portfolio that will appear in search engine results."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
