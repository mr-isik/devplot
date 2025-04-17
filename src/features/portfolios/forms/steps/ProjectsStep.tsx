"use client";

import type { DropzoneOptions } from "react-dropzone";
import type { z } from "zod";
import { toast } from "sonner";
import DynamicFormField, {
  FormFieldType,
} from "@/components/globals/DynamicFormField";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { projectSchema } from "@/lib/validations/portfolio";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExternalLinkIcon,
  FolderKanbanIcon,
  GithubIcon,
  PlusCircleIcon,
  Trash2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/actions/projects/actions";
import { getSafeImageUrl } from "@/lib/utils";

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectsStepProps {
  portfolioId?: string;
}

const imageOptions: DropzoneOptions = {
  accept: { "image/*": [".jpg", ".jpeg", ".png", ".gif"] },
  maxFiles: 1,
  multiple: false,
  maxSize: 1024 * 1024 * 4, // 4MB
};

/**
 * Checks if an image field is effectively empty (null, undefined, empty array, string "[]", etc.)
 */
function isImageEmpty(image: any): boolean {
  if (!image) return true;
  if (typeof image === "string") {
    return (
      image.trim() === "" ||
      image === "[]" ||
      image === "{}" ||
      image === "null"
    );
  }
  if (Array.isArray(image)) {
    return image.length === 0;
  }
  return false;
}

export default function ProjectsStep({ portfolioId }: ProjectsStepProps) {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "projects",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectForm = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      repo_url: "",
      live_url: "",
    },
  });

  const resetAndOpenDialog = (index?: number) => {
    if (index !== undefined && index >= 0 && index < fields.length) {
      const project = fields[index] as unknown as ProjectFormValues;

      console.log("Opening project for edit:", project);

      // Correct image handling for string URLs vs expected File array
      let imageValue;
      if (typeof project.image === "string") {
        // If image is a URL string (from database), handle it specially for display only
        // We'll leave actual image upload empty to avoid validation errors
        imageValue = [];
      } else {
        imageValue = isImageEmpty(project.image) ? [] : project.image;
      }

      // Ensure all required project data is set
      projectForm.reset({
        item_id: project.item_id,
        title: project.title || "",
        description: project.description || "",
        repo_url: project.repo_url || "",
        live_url: project.live_url || "",
        image: imageValue,
      });

      setEditingIndex(index);
    } else {
      projectForm.reset({
        item_id: undefined,
        title: "",
        description: "",
        repo_url: "",
        live_url: "",
        image: [],
      });

      setEditingIndex(null);
    }

    setIsDialogOpen(true);
  };

  const handleAddProject = async (data: ProjectFormValues) => {
    setIsSubmitting(true);

    try {
      // Edit workflow: Update existing project in database
      if (editingIndex !== null && data.item_id && portfolioId) {
        console.log("Updating existing project with ID:", data.item_id);

        // Get the existing project to check current image
        const existingProject = fields[
          editingIndex
        ] as unknown as ProjectFormValues;
        const currentImageIsString = typeof existingProject.image === "string";

        // If the image array is empty but we had a string URL before, keep the existing image URL
        const imageToUpdate =
          Array.isArray(data.image) &&
          data.image.length === 0 &&
          currentImageIsString
            ? existingProject.image // Keep the existing URL
            : data.image; // Otherwise use the new image (array of files or null)

        const { error } = await updateProject({
          item_id: data.item_id,
          title: data.title,
          description: data.description,
          repo_url: data.repo_url,
          live_url: data.live_url,
          image: imageToUpdate,
        });

        if (error) {
          console.error("Update project error:", error);
          toast.error(`Failed to update project: ${error.message}`);
          return;
        }

        // Update form state with correct image
        update(editingIndex, {
          ...data,
          image: imageToUpdate,
        });
        toast.success("Project updated successfully");
      }
      // Create workflow: Add new project to database
      else if (portfolioId) {
        const { data: newProject, error } = await createProject(
          data,
          portfolioId
        );

        if (error) {
          toast.error("Failed to add project");
        }

        console.log(newProject);

        // Update form state with backend ID
        if (newProject && newProject[0]) {
          append({
            ...data,
            item_id: newProject[0].id,
          });
        } else {
          append(data);
        }
        toast.success("Project added successfully");
      }
      // Only update form state (no database)
      else {
        if (editingIndex !== null) {
          remove(editingIndex);
        }
        append(data);
        toast.success(
          editingIndex !== null ? "Project updated" : "Project added"
        );
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveProject = async (index: number, id?: number) => {
    setIsSubmitting(true);
    try {
      // If project exists in database, delete it
      if (id && portfolioId) {
        const { error } = await deleteProject(id);

        if (error) {
          toast.error("Failed to delete project");
        }
        toast.success("Project removed from database");
      }

      // Always remove from form state
      remove(index);
      toast.success("Project removed");
    } catch (error) {
      console.error("Error removing project:", error);
      toast.error("Failed to remove project");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Display form errors for debugging */
  useEffect(() => {
    console.log(projectForm.formState.errors);
  }, [projectForm.formState.errors]);

  return (
    <div className="space-y-6">
      <div className="mobile-borderless-card sm:rounded-xl sm:border sm:bg-card">
        <div className="px-0 pt-0 sm:p-6">
          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-background p-8 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <FolderKanbanIcon className="size-8 text-primary" />
              </div>
              <h3 className="mb-1 text-lg font-medium">
                Showcase your best work
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Projects are the best way to demonstrate your skills and
                expertise. Add projects you've worked on to impress potential
                employers or clients.
              </p>
              <Button
                onClick={() => resetAndOpenDialog()}
                className="gap-1.5"
                disabled={isSubmitting}
              >
                <PlusCircleIcon className="size-4" />
                Add Your First Project
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Mobile header - only visible on mobile */}
              <div className="mb-4 flex items-center justify-between sm:hidden">
                <h2 className="text-lg font-semibold">Projects</h2>
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

              {/* Projects grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                {fields.map((field, index) => {
                  const project = field as unknown as ProjectFormValues;
                  return (
                    <div key={field.id} className="mobile-card group relative">
                      <div className="mobile-card-inner rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:bg-transparent">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-primary">
                              {project.title}
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
                                    handleRemoveProject(index, project.item_id)
                                  }
                                  className="size-8 text-muted-foreground hover:text-destructive"
                                  disabled={isSubmitting}
                                >
                                  <Trash2Icon className="size-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {!isImageEmpty(project.image) && (
                            <div className="relative overflow-hidden rounded-md border shadow-sm">
                              <AspectRatio ratio={16 / 9}>
                                <img
                                  src={getSafeImageUrl(project.image)}
                                  alt={project.title || "Project"}
                                  className="w-full h-full object-cover"
                                />
                              </AspectRatio>
                            </div>
                          )}

                          <p className="text-sm text-muted-foreground">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.repo_url && (
                              <a
                                href={project.repo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                              >
                                <GithubIcon className="size-4" />
                                Repository
                              </a>
                            )}

                            {project.live_url && (
                              <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground"
                              >
                                <ExternalLinkIcon className="mr-1 size-3" />
                                Live Demo
                              </a>
                            )}
                          </div>

                          {/* Mobile actions - Only visible on mobile */}
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
                                handleRemoveProject(index, project.item_id)
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

              {/* Desktop add button - only visible on desktop */}
              <div className="mt-6 hidden sm:block">
                <Button
                  onClick={() => resetAndOpenDialog()}
                  className="gap-1.5"
                  disabled={isSubmitting}
                >
                  <PlusCircleIcon className="size-4" />
                  Add Project
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Count indicator for projects */}
        {fields.length > 0 && (
          <div className="mt-4 hidden border-t px-6 py-4 sm:block">
            <p className="text-sm text-muted-foreground">
              {fields.length} project
              {fields.length !== 1 ? "s" : ""} added
            </p>
          </div>
        )}
      </div>

      {/* Dialog for adding/editing projects */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={projectForm.handleSubmit(handleAddProject)}>
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription>
                Enter information about your project
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <DynamicFormField
                control={projectForm.control}
                name="title"
                label="Project Name"
                placeholder="E.g.: DevPlot - Developer Portfolio Builder"
                fieldType={FormFieldType.INPUT}
              />

              {editingIndex === null && (
                <DynamicFormField
                  control={projectForm.control}
                  name="image"
                  label="Image (4MB max)"
                  fieldType={FormFieldType.FILE}
                  fileOptions={imageOptions}
                />
              )}

              <DynamicFormField
                control={projectForm.control}
                name="description"
                label="Description"
                placeholder="Write a brief description about your project"
                fieldType={FormFieldType.TEXTAREA}
              />

              <DynamicFormField
                control={projectForm.control}
                name="repo_url"
                label="GitHub / GitLab / Source Code URL"
                placeholder="E.g.: https://github.com/username/project"
                fieldType={FormFieldType.INPUT}
              />

              <DynamicFormField
                control={projectForm.control}
                name="live_url"
                label="Live Demo URL"
                placeholder="E.g.: https://my-project.vercel.app"
                fieldType={FormFieldType.INPUT}
              />
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
                {isSubmitting
                  ? "Saving..."
                  : editingIndex !== null
                    ? "Update"
                    : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
