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

type SkillFormValues = z.infer<typeof skillSchema>;

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

export default function SkillsStep() {
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
        name: skill.name || "",
      });
      setEditingIndex(index);
    } else {
      skillForm.reset({
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
    try {
      setIsSubmitting(true);

      const isValid = await skillForm.trigger();
      if (!isValid) {
        return;
      }

      // Check for duplicates
      if (isSkillAlreadyAdded(data.name)) {
        toast.error(`Skill "${data.name}" is already added`);
        return;
      }

      if (editingIndex !== null) {
        remove(editingIndex);
        append(data);
      } else {
        append(data);
      }

      setIsDialogOpen(false);
      toast.success(editingIndex !== null ? "Skill updated" : "Skill added");

      skillForm.reset();
    } catch (error) {
      console.error("Error adding skill:", error);
      toast.error("Failed to add skill");
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

  const handleRemoveSkill = async (index: number) => {
    try {
      remove(index);
      toast.success("Skill removed");
    } catch (error) {
      console.error("Error removing skill:", error);
      toast.error("Failed to remove skill");
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
              <div className="flex flex-wrap gap-2">
                {fields.map((field, index) => {
                  const skill = field as unknown as SkillFormValues;
                  const SkillIcon = getSkillIcon(skill.name);
                  const skillColor = getSkillColor(skill.name);

                  return (
                    <Badge
                      key={field.id}
                      variant="secondary"
                      className="group flex items-center gap-1.5 px-3 py-1.5 hover:bg-secondary"
                    >
                      <div
                        className="flex size-5 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${skillColor}20` }}
                      >
                        <SkillIcon
                          className="size-3"
                          style={{ color: skillColor }}
                        />
                      </div>
                      <span className="font-medium">{skill.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-1 size-4 rounded-full p-0 opacity-0 group-hover:opacity-100"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        <TrashIcon className="size-3" />
                      </Button>
                    </Badge>
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
