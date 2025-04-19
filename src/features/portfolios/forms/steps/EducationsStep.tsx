"use client";

import type { z } from "zod";
import { toast } from "sonner";
import DynamicFormField, {
  FormFieldType,
} from "@/components/globals/DynamicFormField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormLabel } from "@/components/ui/form";
import { educationSchema } from "@/lib/validations/portfolio";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { GraduationCapIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import {
  createEducation,
  deleteEducation,
  updateEducation,
} from "@/actions/educations/actions";
import Loader from "@/components/globals/Loader";

type EducationFormValues = z.infer<typeof educationSchema>;

interface EducationsStepProps {
  portfolioId?: string;
}

export default function EducationsStep({
  portfolioId,
}: EducationsStepProps = {}) {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "educations",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const educationForm = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      school: "",
      degree: "",
      field: "",
      start_date: "",
      end_date: "",
    },
  });

  const resetAndOpenDialog = (index?: number) => {
    if (index !== undefined && index >= 0 && index < fields.length) {
      const education = fields[index] as unknown as EducationFormValues;
      educationForm.reset({
        item_id: education.item_id,
        school: education.school || "",
        degree: education.degree || "",
        field: education.field || "",
        start_date: education.start_date || "",
        end_date: education.end_date || "",
      });
      setEditingIndex(index);
    } else {
      educationForm.reset({
        item_id: undefined,
        school: "",
        degree: "",
        field: "",
        start_date: "",
        end_date: "",
      });
      setEditingIndex(null);
    }
    setIsDialogOpen(true);
  };

  const handleAddEducation = async (data: EducationFormValues) => {
    setIsSubmitting(true);
    try {
      const prepareDataForServer = (formData: EducationFormValues) => {
        const serverData = { ...formData };

        // Convert empty strings to undefined (which will be null in SQL)
        if (serverData.start_date === "") {
          // @ts-ignore - we know this is safe as the server will convert undefined to null
          serverData.start_date = undefined;
        }

        // Convert "Present" or empty to null for end_date
        if (serverData.end_date === "" || serverData.end_date === "Present") {
          // @ts-ignore - we know this is safe as the server will convert undefined to null
          serverData.end_date = undefined;
        }

        return serverData;
      };

      if (editingIndex !== null && data.item_id && portfolioId) {
        const { error } = await updateEducation({
          ...prepareDataForServer(data),
          item_id: data.item_id,
        });

        if (error) {
          throw new Error(`Failed to update education: ${error.message}`);
        }

        update(editingIndex, data);
        toast.success("Education updated successfully");
      } else if (portfolioId) {
        const { data: newEducation, error } = await createEducation(
          prepareDataForServer(data),
          portfolioId
        );

        if (error) {
          throw new Error(`Failed to add education: ${error.message}`);
        }

        if (newEducation && newEducation[0]) {
          append({
            ...data,
            /* @ts-ignore */
            item_id: newEducation[0].id,
          });
        } else {
          append(data);
        }
        toast.success("Education added successfully");
      } else {
        if (editingIndex !== null) {
          remove(editingIndex);
        }
        append(data);
        toast.success(
          editingIndex !== null ? "Education updated" : "Education added"
        );
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving education:", error);
      toast.error("Failed to save education");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveEducation = async (index: number, id?: number) => {
    setIsSubmitting(true);
    try {
      if (id && portfolioId) {
        const { error } = await deleteEducation(id);

        if (error) {
          throw new Error(`Failed to delete education: ${error.message}`);
        }
        toast.success("Education removed from database");
      }

      remove(index);
      toast.success("Education removed");
    } catch (error) {
      console.error("Error removing education:", error);
      toast.error("Failed to remove education");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentlyStudying = educationForm.watch("end_date") === "Present";

  return (
    <div className="space-y-6">
      <div className="mobile-borderless-card sm:rounded-xl sm:border sm:bg-card">
        <div className="px-0 pt-0 sm:p-6">
          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-background p-8 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <GraduationCapIcon className="size-8 text-primary" />
              </div>
              <h3 className="mb-1 text-lg font-medium">
                Showcase your educational qualifications
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Adding your education details helps establish your academic
                credentials and expertise in your field.
              </p>
              <Button onClick={() => resetAndOpenDialog()} className="gap-1.5">
                <PlusCircleIcon className="size-4" />
                Add Your First Education
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mb-4 flex items-center justify-between sm:hidden">
                <h2 className="text-lg font-semibold">Education</h2>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => resetAndOpenDialog()}
                  className="gap-1"
                  disabled={isSubmitting}
                >
                  <PlusCircleIcon className="size-4" />
                  Add
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => {
                  const education = field as unknown as EducationFormValues;
                  return (
                    <div key={field.id} className="mobile-card group relative">
                      <div className="mobile-card-inner rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:bg-transparent">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-primary">
                              {education.school}
                            </h4>
                            <div className="shrink-0">
                              <div className="hidden items-center gap-1.5 sm:flex">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => resetAndOpenDialog(index)}
                                  className="h-8 px-2"
                                  disabled={isSubmitting}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleRemoveEducation(
                                      index,
                                      education.item_id
                                    )
                                  }
                                  className="size-8 text-muted-foreground hover:text-destructive"
                                  disabled={isSubmitting}
                                >
                                  <Trash2Icon className="size-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <p className="text-base font-medium">
                              {education.degree}
                              {education.field && (
                                <>
                                  {" "}
                                  in{" "}
                                  <span className="text-muted-foreground">
                                    {education.field}
                                  </span>
                                </>
                              )}
                            </p>
                            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <GraduationCapIcon className="size-4 text-primary/80" />
                              {education.start_date
                                ? format(education.start_date, "MMM yyyy")
                                : ""}{" "}
                              -{" "}
                              <span
                                className={
                                  education.end_date === "Present"
                                    ? "font-medium text-primary"
                                    : ""
                                }
                              >
                                {education.end_date !== "Present" &&
                                education.end_date
                                  ? format(education.end_date, "MMM yyyy")
                                  : "Present"}
                              </span>
                            </p>
                          </div>

                          <div className="mt-3 flex justify-end border-t pt-2 sm:hidden">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => resetAndOpenDialog(index)}
                              className="h-8 px-3 text-xs"
                              disabled={isSubmitting}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleRemoveEducation(index, education.item_id)
                              }
                              className="h-8 px-3 text-xs text-muted-foreground hover:text-destructive"
                              disabled={isSubmitting}
                            >
                              <Trash2Icon className="mr-1 size-3" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 hidden sm:block">
                <Button
                  onClick={() => resetAndOpenDialog()}
                  className="gap-1.5"
                  disabled={isSubmitting}
                >
                  <PlusCircleIcon className="size-4" />
                  Add Education
                </Button>
              </div>
            </div>
          )}
        </div>

        {fields.length > 0 && (
          <div className="mt-4 hidden border-t px-6 py-4 sm:block">
            <p className="text-sm text-muted-foreground">
              {fields.length} education
              {fields.length !== 1 ? "s" : ""} added
            </p>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={educationForm.handleSubmit(handleAddEducation)}>
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null ? "Edit Education" : "Add New Education"}
              </DialogTitle>
              <DialogDescription>
                Enter information about your educational background
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <DynamicFormField
                control={educationForm.control}
                name="school"
                label="School / University"
                placeholder="E.g.: Massachusetts Institute of Technology"
                fieldType={FormFieldType.INPUT}
              />

              <DynamicFormField
                control={educationForm.control}
                name="degree"
                label="Degree"
                placeholder="E.g.: Bachelor's, Master's, PhD"
                fieldType={FormFieldType.INPUT}
              />

              <DynamicFormField
                control={educationForm.control}
                name="field"
                label="Field of Study"
                placeholder="E.g.: Computer Science"
                fieldType={FormFieldType.INPUT}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <DynamicFormField
                    control={educationForm.control}
                    name="start_date"
                    label="Start Date (mm/dd/yyyy)"
                    fieldType={FormFieldType.DATE}
                  />

                  <div className="flex items-center gap-2 px-1">
                    <Checkbox
                      id="currently-studying"
                      checked={currentlyStudying}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          educationForm.setValue("end_date", "Present");
                        } else {
                          educationForm.setValue("end_date", "");
                        }
                        educationForm.trigger("end_date");
                      }}
                    />
                    <FormLabel
                      htmlFor="currently-studying"
                      className="!m-0 text-sm font-normal"
                    >
                      I am currently studying here
                    </FormLabel>
                  </div>
                </div>

                <div className="space-y-2">
                  <DynamicFormField
                    control={educationForm.control}
                    name="end_date"
                    label="End Date (mm/dd/yyyy)"
                    fieldType={FormFieldType.DATE}
                    disabled={currentlyStudying}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Loader state={isSubmitting}>
                  {editingIndex !== null ? "Update" : "Add"} Education
                </Loader>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
