"use client";

import type { DropzoneOptions } from "react-dropzone";
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
import { SelectItem } from "@/components/ui/select";
import { experienceSchema } from "@/lib/validations/portfolio";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { BriefcaseIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import {
  createExperience,
  deleteExperience,
  updateExperience,
} from "@/actions/experiences/actions";
import Loader from "@/components/globals/Loader";

type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface ExperiencesStepProps {
  portfolioId?: number;
}

const logoOptions: DropzoneOptions = {
  accept: { "image/*": [".jpg", ".jpeg", ".png", ".gif"] },
  maxFiles: 1,
  multiple: false,
  maxSize: 1024 * 1024 * 1, // 1MB
};

const employmentTypeOptions = [
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
];

/**
 * Checks if a logo field is effectively empty (null, undefined, empty array, string "[]", etc.)
 */
function isLogoEmpty(logo: any): boolean {
  if (!logo) return true;
  if (typeof logo === "string") {
    // If it's a valid URL or file path, it's not empty
    if (logo.startsWith("http") || logo.startsWith("/")) return false;
    // If it's an empty string or string representation of empty data, it's empty
    return (
      logo.trim() === "" || logo === "[]" || logo === "{}" || logo === "null"
    );
  }
  if (Array.isArray(logo)) {
    return logo.length === 0;
  }
  return false;
}

export default function ExperiencesStep({
  portfolioId,
}: ExperiencesStepProps = {}) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const experienceForm = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      role: "",
      company: "",
      employment_type: undefined,
      start_date: "",
      end_date: "",
      description: "",
    },
  });

  const resetAndOpenDialog = (index?: number) => {
    if (index !== undefined && index >= 0 && index < fields.length) {
      const experience = fields[index] as unknown as ExperienceFormValues;

      // When editing, keep the form values but handle logo specially
      // We set the logo to an empty array in the form to avoid validation errors
      // But we'll preserve the original logo URL/path for display
      experienceForm.reset({
        item_id: experience.item_id,
        role: experience.role || "",
        company: experience.company || "",
        employment_type: experience.employment_type || undefined,
        start_date: experience.start_date || "",
        end_date: experience.end_date || "",
        description: experience.description || "",
        logo: [], // Always use empty array in form to avoid validation issues
      });
      setEditingIndex(index);
    } else {
      experienceForm.reset({
        role: "",
        company: "",
        employment_type: undefined,
        start_date: "",
        end_date: "",
        description: "",
        logo: [],
      });
      setEditingIndex(null);
    }
    setIsDialogOpen(true);
  };

  const handleAddExperience = async (data: ExperienceFormValues) => {
    setIsSubmitting(true);

    try {
      // Function to ensure empty string dates are handled correctly
      // This approach maintains type safety while allowing us to convert empty strings to null in the SQL
      const prepareDataForServer = (formData: ExperienceFormValues) => {
        const serverData = { ...formData };

        // Convert empty strings to undefined (which will be null in SQL)
        if (serverData.start_date === "") {
          // @ts-ignore - we know this is safe as the server will convert undefined to null
          serverData.start_date = undefined;
        }

        // Convert "Present" to null for end_date
        if (serverData.end_date === "" || serverData.end_date === "Present") {
          // @ts-ignore - we know this is safe as the server will convert undefined to null
          serverData.end_date = undefined;
        }

        return serverData;
      };

      // Edit workflow: Existing experience update with id
      if (editingIndex !== null && data.item_id && portfolioId) {
        // Get current experience to preserve logo if not changed
        const currentExperience = fields[
          editingIndex
        ] as unknown as ExperienceFormValues;

        // Use the existing logo if the form logo array is empty
        const logoToUpdate =
          isLogoEmpty(data.logo) && !isLogoEmpty(currentExperience.logo)
            ? currentExperience.logo
            : isLogoEmpty(data.logo)
              ? null
              : data.logo;

        // Database update via server action
        const { error } = await updateExperience({
          ...prepareDataForServer(data),
          item_id: data.item_id,
          logo: logoToUpdate,
        });

        if (error) {
          throw new Error(`Failed to update experience: ${error.message}`);
        }

        // Update form state
        remove(editingIndex);
        append({
          ...data,
          logo: logoToUpdate,
        });
        toast.success("Experience updated successfully");
      }
      // Create workflow: New experience with portfolioId
      else if (portfolioId) {
        // Ensure logo is null when empty
        const logoToSend = isLogoEmpty(data.logo) ? null : data.logo;

        // Create via server action
        const { data: newExperience, error } = await createExperience(
          { ...prepareDataForServer(data), logo: logoToSend },
          portfolioId
        );

        if (error) {
          throw new Error(`Failed to add experience: ${error.message}`);
        }

        // Update form state with backend id
        if (newExperience && newExperience[0]) {
          append({
            item_id: newExperience[0].id,
            ...data,
            logo: logoToSend,
          });
        } else {
          append({
            ...data,
            logo: logoToSend,
          });
        }
        toast.success("Experience added successfully");
      }
      // Create workflow: Just form state update
      else {
        // Ensure logo is null when empty
        const logoToSend = isLogoEmpty(data.logo) ? null : data.logo;

        if (editingIndex !== null) {
          remove(editingIndex);
        }
        append({
          ...data,
          logo: logoToSend,
        });
        toast.success(
          editingIndex !== null ? "Experience updated" : "Experience added"
        );
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving experience:", error);
      toast.error("Failed to save experience");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveExperience = async (index: number, id?: number) => {
    setIsSubmitting(true);
    try {
      // If id and portfolioId exist, delete from database
      if (id && portfolioId) {
        // Note: We're passing an empty string as the logo_path
        // This will prevent errors with file deletion
        // The server can handle this safely
        const { error } = await deleteExperience(id, "");

        if (error) {
          toast.error("Failed to remove experience");
        } else {
          toast.success("Experience removed from database");
        }
      }

      // Always remove from form state
      remove(index);

      toast.success("Experience removed");
    } catch (error) {
      console.error("Error removing experience:", error);
      toast.error("Failed to remove experience");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentlyWorking = experienceForm.watch("end_date") === "Present";

  return (
    <div className="space-y-6">
      <div className="mobile-borderless-card sm:rounded-xl sm:border sm:bg-card sm:p-6">
        {/* Empty state */}
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-background p-8 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <BriefcaseIcon className="size-8 text-primary" />
            </div>
            <h3 className="mb-1 text-lg font-medium">
              Highlight your professional journey
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Adding your work experience helps visitors understand your
              professional background and expertise.
            </p>
            <Button onClick={() => resetAndOpenDialog()} className="gap-1.5">
              <PlusCircleIcon className="size-4" />
              Add Your First Experience
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Mobile header - only visible on mobile */}
            <div className="mb-4 flex items-center justify-between sm:hidden">
              <h2 className="text-lg font-semibold">Work Experience</h2>
              <Button
                size="sm"
                variant="outline"
                onClick={() => resetAndOpenDialog()}
                className="gap-1"
              >
                <PlusCircleIcon className="size-4" />
                Add
              </Button>
            </div>

            {/* Experience cards list */}
            <div className="space-y-3">
              {fields.map((field, index) => {
                const experience = field as unknown as ExperienceFormValues;
                return (
                  <div key={field.id} className="mobile-card group relative">
                    <div className="mobile-card-inner rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:bg-transparent">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-primary">
                            {experience.role}
                          </h4>
                          <div className="shrink-0">
                            <div className="hidden items-center gap-1.5 sm:flex">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => resetAndOpenDialog(index)}
                                className="h-8 px-2"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleRemoveExperience(
                                    index,
                                    experience.item_id
                                  )
                                }
                                className="size-8 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2Icon className="size-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <div className="mb-2 flex items-center gap-2">
                            {experience.logo &&
                              !isLogoEmpty(experience.logo) && (
                                <div className="relative size-10 rounded-md border overflow-hidden">
                                  <Image
                                    src={
                                      typeof experience.logo === "string"
                                        ? experience.logo
                                        : URL.createObjectURL(
                                            experience.logo[0]
                                          )
                                    }
                                    alt={experience.company || "Company"}
                                    fill
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                            <p className="text-base font-medium text-muted-foreground">
                              {experience.company}
                            </p>
                          </div>
                          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <BriefcaseIcon className="size-4 text-primary/80" />
                            {format(experience.start_date, "MMM yyyy")} -{" "}
                            <span
                              className={
                                experience.end_date === "Present"
                                  ? "font-medium text-primary"
                                  : ""
                              }
                            >
                              {experience.end_date !== "Present" &&
                              experience.end_date
                                ? format(experience.end_date, "MMM yyyy")
                                : "Present"}
                            </span>
                          </p>
                          {experience.employment_type && (
                            <p className="text-sm text-muted-foreground">
                              {employmentTypeOptions.find(
                                (option) =>
                                  option.value === experience.employment_type
                              )?.label || experience.employment_type}
                            </p>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {experience.description}
                        </p>

                        {/* Mobile actions - Only visible on mobile */}
                        <div className="mt-3 flex justify-end border-t pt-2 sm:hidden">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => resetAndOpenDialog(index)}
                            className="h-8 px-3 text-xs"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleRemoveExperience(index, experience.item_id)
                            }
                            className="h-8 px-3 text-xs text-muted-foreground hover:text-destructive"
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

            {/* Desktop add button - only visible on desktop */}
            <div className="mt-6 hidden sm:block">
              <Button onClick={() => resetAndOpenDialog()} className="gap-1.5">
                <PlusCircleIcon className="size-4" />
                Add Experience
              </Button>
            </div>
          </div>
        )}

        {/* Count indicator for experiences */}
        {fields.length > 0 && (
          <div className="mt-4 hidden border-t pt-4 sm:block">
            <p className="text-sm text-muted-foreground">
              {fields.length} experience
              {fields.length !== 1 ? "s" : ""} added
            </p>
          </div>
        )}
      </div>

      {/* Dialog for adding/editing experiences */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={experienceForm.handleSubmit(handleAddExperience)}>
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null
                  ? "Edit Experience"
                  : "Add New Experience"}
              </DialogTitle>
              <DialogDescription>
                Enter information about your work experience
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <DynamicFormField
                control={experienceForm.control}
                name="role"
                label="Job Title *"
                placeholder="E.g.: Senior Frontend Developer"
                fieldType={FormFieldType.INPUT}
              />

              <DynamicFormField
                control={experienceForm.control}
                name="company"
                label="Company *"
                placeholder="E.g.: Acme Inc."
                fieldType={FormFieldType.INPUT}
              />

              <DynamicFormField
                control={experienceForm.control}
                name="logo"
                label="Logo (1MB max)"
                fieldType={FormFieldType.FILE}
                fileOptions={logoOptions}
              />

              <DynamicFormField
                control={experienceForm.control}
                name="employment_type"
                label="Employment Type"
                fieldType={FormFieldType.SELECT}
                placeholder="Please Select"
              >
                {employmentTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </DynamicFormField>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <DynamicFormField
                    control={experienceForm.control}
                    name="start_date"
                    label="Start Date (mm/dd/yyyy)"
                    placeholder="E.g.: 2020-01-01"
                    fieldType={FormFieldType.DATE}
                  />

                  <div className="flex items-center gap-2 px-1">
                    <Checkbox
                      id="currently-working"
                      checked={currentlyWorking}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          experienceForm.setValue("end_date", "Present");
                        } else {
                          experienceForm.setValue("end_date", "");
                        }
                        experienceForm.trigger("end_date");
                      }}
                    />
                    <FormLabel
                      htmlFor="currently-working"
                      className="!m-0 text-sm font-normal"
                    >
                      I currently work here
                    </FormLabel>
                  </div>
                </div>

                {!currentlyWorking && (
                  <div className="space-y-2">
                    <DynamicFormField
                      control={experienceForm.control}
                      name="end_date"
                      label="End Date (mm/dd/yyyy)"
                      fieldType={FormFieldType.DATE}
                      disabled={currentlyWorking}
                    />
                  </div>
                )}
              </div>

              <DynamicFormField
                control={experienceForm.control}
                name="description"
                label="Description *"
                placeholder="Briefly describe your responsibilities and achievements"
                fieldType={FormFieldType.TEXTAREA}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Loader state={isSubmitting}>
                  {editingIndex !== null ? "Update" : "Add"} Experience
                </Loader>
              </Button>
            </DialogFooter>

            {/* Errors */}
            <div>
              {experienceForm.formState.errors.logo && (
                <span className="text-destructive">
                  {experienceForm.formState.errors.logo.message}
                </span>
              )}
              {experienceForm.formState.errors.role && (
                <span className="text-destructive">
                  {experienceForm.formState.errors.role?.message}
                </span>
              )}
              {experienceForm.formState.errors.company && (
                <span className="text-destructive">
                  {experienceForm.formState.errors.company?.message}
                </span>
              )}
              {experienceForm.formState.errors.employment_type && (
                <span className="text-destructive">
                  {experienceForm.formState.errors.employment_type?.message}
                </span>
              )}
              {experienceForm.formState.errors.start_date && (
                <span className="text-destructive">
                  {experienceForm.formState.errors.start_date?.message}
                </span>
              )}
              {experienceForm.formState.errors.end_date && (
                <span className="text-destructive">
                  {experienceForm.formState.errors.end_date?.message}
                </span>
              )}
              {experienceForm.formState.errors.description && (
                <span className="text-destructive">
                  {experienceForm.formState.errors.description?.message}
                </span>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
