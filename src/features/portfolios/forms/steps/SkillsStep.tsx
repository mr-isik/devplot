"use client";

import type { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  COMMON_SKILLS,
  getSkillColor,
  getSkillIcon,
  SKILL_CATEGORIES,
} from "@/lib/skillsData";
import { skillSchema } from "@/lib/validations/portfolio";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PlusCircleIcon,
  SearchIcon,
  TrashIcon,
  WrenchIcon,
} from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { createSkill, deleteSkill } from "@/actions/skills/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SkillFormValues = z.infer<typeof skillSchema> & {
  id?: string;
};

interface SkillsStepProps {
  portfolioId?: string;
}

// Top skills to show in quick-add section
const TOP_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "HTML",
  "CSS",
  "Node.js",
  "Python",
  "Git",
  "SQL",
  "Tailwind CSS",
  "Next.js",
  "AWS",
  "Docker",
];

const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

export default function SkillsStep({ portfolioId }: SkillsStepProps = {}) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const skillForm = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
    },
  });

  const selectedSkillName = skillForm.watch("name");

  const resetAndOpenDialog = (index?: number) => {
    if (index !== undefined && index >= 0 && index < fields.length) {
      const skill = fields[index] as unknown as SkillFormValues;
      skillForm.reset({
        id: skill.id,
        name: skill.name || "",
      });
      setEditingIndex(index);
    } else {
      skillForm.reset({
        id: undefined,
        name: "",
      });
      setEditingIndex(null);
    }
    setIsDialogOpen(true);
    setSearchQuery("");
  };

  // Check if a skill already exists
  const isSkillAlreadyAdded = (skillName: string) => {
    return fields.some((field) => {
      const skill = field as unknown as SkillFormValues;
      return skill.name.toLowerCase() === skillName.toLowerCase();
    });
  };

  const handleAddSkill = async (data: SkillFormValues) => {
    setIsSubmitting(true);
    try {
      // Create workflow: Add new skill to database
      if (portfolioId) {
        const { data: newSkill, error } = await createSkill({
          name: data.name,
          portfolio_id: portfolioId,
        });

        if (error) {
          throw new Error(`Failed to add skill: ${error.message}`);
        }

        // Update form state with backend ID
        if (newSkill && newSkill[0]) {
          append({
            ...data,
            id: newSkill[0].id,
          });
        } else {
          append(data);
        }
        toast.success("Skill added successfully");
      }
      // Only update form state (no database)
      else {
        if (editingIndex !== null) {
          remove(editingIndex);
        }
        append(data);
        toast.success(editingIndex !== null ? "Skill updated" : "Skill added");
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving skill:", error);
      toast.error("Failed to save skill");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick add a skill with one click
  const handleQuickAddSkill = (skillName: string) => {
    if (isSkillAlreadyAdded(skillName)) {
      toast.error(`Skill "${skillName}" is already added`);
      return;
    }

    append({ name: skillName });
    toast.success(`Added ${skillName}`);
  };

  const handleRemoveSkill = async (index: number, id?: string) => {
    setIsSubmitting(true);
    try {
      // If skill exists in database, delete it
      if (id && portfolioId) {
        const { error } = await deleteSkill(id);

        if (error) {
          throw new Error(`Failed to delete skill: ${error.message}`);
        }
        toast.success("Skill removed from database");
      }

      // Always remove from form state
      remove(index);
      toast.success("Skill removed");
    } catch (error) {
      console.error("Error removing skill:", error);
      toast.error("Failed to remove skill");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter skills based on search query
  const filteredSkills = COMMON_SKILLS.filter((skill) =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const comboboxItems = filteredSkills.map((skill) => ({
    value: skill.name,
    label: skill.name,
    icon: (
      <div
        className="flex size-5 items-center justify-center rounded-full"
        style={{ backgroundColor: `${skill.color}20` }}
      >
        {skill.icon &&
          React.createElement(skill.icon, {
            className: "size-3",
            style: { color: skill.color },
          })}
      </div>
    ),
    group: skill.category,
  }));

  // Filter top skills that haven't been added yet
  const availableTopSkills = TOP_SKILLS.filter(
    (skill) => !isSkillAlreadyAdded(skill)
  );

  return (
    <div className="space-y-6">
      <div className="mobile-borderless-card sm:rounded-xl sm:border sm:bg-card">
        <div className="px-0 pt-0 sm:p-6">
          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-background p-8 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <WrenchIcon className="size-8 text-primary" />
              </div>
              <h3 className="mb-1 text-xl font-medium">Showcase your skills</h3>
              <p className="mb-4 max-w-md text-sm text-muted-foreground">
                Add your technical skills, programming languages, tools, and
                soft skills to demonstrate your expertise and help employers
                find you.
              </p>

              {/* Quick-add section for common skills */}
              <div className="mb-6 w-full max-w-2xl">
                <h4 className="mb-2 text-sm font-medium">
                  Quick-add popular skills:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {TOP_SKILLS.slice(0, 8).map((skill) => (
                    <Button
                      key={skill}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAddSkill(skill)}
                      className="h-8"
                    >
                      <PlusCircleIcon className="mr-1 size-3" />
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => resetAndOpenDialog()}
                className="gap-1.5"
                size="lg"
              >
                <SearchIcon className="size-4" />
                Search More Skills
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Mobile header - only visible on mobile */}
              <div className="mb-4 flex items-center justify-between sm:hidden">
                <h2 className="text-lg font-semibold">Skills</h2>
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

              {/* Skills list */}
              <div className="grid gap-3 sm:grid-cols-2">
                {fields.map((field, index) => {
                  const skill = field as unknown as SkillFormValues;
                  const SkillIcon = getSkillIcon(skill.name);
                  const skillColor = getSkillColor(skill.name);

                  return (
                    <div key={field.id} className="mobile-card group relative">
                      <div className="mobile-card-inner rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:bg-transparent">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{skill.name}</h4>
                            </div>
                            <div className="shrink-0">
                              <div className="hidden items-center gap-1.5 sm:flex">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleRemoveSkill(index, skill.id)
                                  }
                                  className="size-8 text-muted-foreground hover:text-destructive"
                                  disabled={isSubmitting}
                                >
                                  <TrashIcon className="size-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Mobile actions - Only visible on mobile */}
                          <div className="mt-3 flex justify-end border-t pt-2 sm:hidden">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveSkill(index, skill.id)}
                              className="h-8 px-3 text-xs text-muted-foreground hover:text-destructive"
                              disabled={isSubmitting}
                            >
                              <TrashIcon className="mr-1 size-3" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick-add section for skills */}
              {availableTopSkills.length > 0 && (
                <div className="mt-4 space-y-2 rounded-lg border bg-background p-4">
                  <h4 className="text-sm font-medium">
                    Quick add popular skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {availableTopSkills.slice(0, 8).map((skill) => (
                      <Button
                        key={skill}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAddSkill(skill)}
                        className="h-8"
                      >
                        <PlusCircleIcon className="mr-1 size-3" />
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Desktop add button - only visible on desktop */}
              <div className="mt-6 hidden sm:block">
                <Button
                  onClick={() => resetAndOpenDialog()}
                  className="gap-1.5"
                >
                  <SearchIcon className="size-4" />
                  Search More Skills
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Count indicator for skills */}
        {fields.length > 0 && (
          <div className="mt-4 hidden border-t px-6 py-4 sm:block">
            <p className="text-sm text-muted-foreground">
              {fields.length} skill
              {fields.length !== 1 ? "s" : ""} added
            </p>
          </div>
        )}
      </div>

      {/* Dialog for adding skills */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={skillForm.handleSubmit(handleAddSkill)}>
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null ? "Edit Skill" : "Add Skill"}
              </DialogTitle>
              <DialogDescription>
                {editingIndex !== null
                  ? "Update this skill in your portfolio."
                  : "Add a new skill to your portfolio."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Search input for filtering skills */}
              <div className="space-y-2">
                <FormLabel>Search Skills</FormLabel>
                <Input
                  type="text"
                  placeholder="Type to search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-2"
                />
              </div>

              {/* Skills selection list */}
              {filteredSkills.length > 0 ? (
                <div className="max-h-60 overflow-y-auto rounded-md border p-2">
                  <div className="flex flex-wrap gap-2">
                    {filteredSkills.slice(0, 20).map((skill) => (
                      <Button
                        key={skill.name}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          skillForm.setValue("name", skill.name);
                          skillForm.handleSubmit(handleAddSkill)();
                        }}
                        className="flex h-8 items-center gap-1.5"
                      >
                        <div
                          className="flex size-4 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${skill.color}20` }}
                        >
                          {skill.icon &&
                            React.createElement(skill.icon, {
                              className: "size-3",
                              style: { color: skill.color },
                            })}
                        </div>
                        {skill.name}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  No skills found matching your search
                </p>
              )}

              <FormField
                control={skillForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
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
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
