"use client";

import type { z } from "zod";
import { Button } from "@/components/ui/button";
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
  SKILL_CATEGORIES,
  getSkillColor,
  getSkillIcon,
} from "@/lib/skillsData";
import { skillSchema } from "@/lib/validations/portfolio";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon, SearchIcon, WrenchIcon, CodeIcon } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { addSkill, deleteSkill } from "@/actions/skills/actions";
import { SkillCard } from "./components/SkillCard";
import { CategoryFilter } from "./components/CategoryFilter";
import { AnimatePresence } from "framer-motion";
import { Skill, SkillCategory } from "@/features/skills/types";

type SkillFormValues = z.infer<typeof skillSchema>;

// Type for database skills enhanced with presentation details
type EnhancedDbSkill = {
  id: number;
  name: string;
  icon: React.ElementType;
  color: string;
  category: string;
  category_id?: string;
  category_name?: string;
  portfolio_skill_id?: number;
  skills?: any; // For nested skills from join queries
  [key: string]: any;
};

interface SkillsStepProps {
  portfolioId?: number;
  skillsData?: Skill[] | null;
  categoriesData?: SkillCategory[] | null;
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
  "Docker",
];

export default function SkillsStep({
  portfolioId,
  skillsData = [],
  categoriesData = [],
}: SkillsStepProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [removingSkillId, setRemovingSkillId] = useState<string | null>(null);

  const skillForm = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      item_id: undefined,
    },
  });

  const resetAndOpenDialog = (index?: number) => {
    if (index !== undefined && index >= 0 && index < fields.length) {
      const skill = fields[index] as unknown as SkillFormValues;
      skillForm.reset({
        item_id: skill.item_id,
        name: skill.name || "",
      });
      setEditingIndex(index);
    } else {
      skillForm.reset({
        item_id: undefined,
        name: "",
      });
      setEditingIndex(null);
    }
    setIsDialogOpen(true);
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const isSkillAlreadyAdded = (skillName: string) => {
    return fields.some((field) => {
      const skill = field as unknown as SkillFormValues;
      return skill.name.toLowerCase() === skillName.toLowerCase();
    });
  };

  const handleAddSkill = async (data: SkillFormValues) => {
    // Prevent duplicate skills from being added
    if (isSkillAlreadyAdded(data.name) && editingIndex === null) {
      toast.error(`Skill "${data.name}" is already added`);
      return;
    }

    setIsSubmitting(true);
    try {
      // Create workflow: Add new skill to database
      if (portfolioId && data.item_id) {
        // If we have both a portfolio ID and a skill ID, save the association
        const { data: newSkill, error } = await addSkill(
          data.item_id,
          portfolioId
        );

        if (error) {
          console.error("Database error:", error);
          throw new Error(`Failed to add skill: ${error.message}`);
        }

        // Update form state with the skill data
        if (editingIndex !== null) {
          remove(editingIndex);
        }
        append(data);
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
  const handleQuickAddSkill = async (skillName: string, skillId?: number) => {
    if (isSkillAlreadyAdded(skillName)) {
      toast.error(`Skill "${skillName}" is already added`);
      return;
    }

    setIsSubmitting(true);
    try {
      // If we already have the skill ID and portfolioId, save the association
      if (portfolioId && skillId) {
        const { data: newSkill, error } = await addSkill(
          skillId,
          Number(portfolioId)
        );

        if (error) {
          console.error("Quick add database error:", error);
          throw new Error(`Failed to add skill: ${error.message}`);
        }

        // Add skill to form state
        append({
          name: skillName,
          item_id: skillId,
        });

        toast.success(`Added ${skillName} to your portfolio`);
      } else {
        // No portfolioId or skill not found in database, just add to form state
        append({ name: skillName });
        toast.success(`Added ${skillName}`);
      }
    } catch (error) {
      console.error("Error quick adding skill:", error);
      toast.error(`Failed to add ${skillName}`);

      // Add to form state anyway as fallback
      append({ name: skillName });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveSkill = async (index: number, itemId?: number) => {
    // Store the field ID to be removed for animation
    const fieldToRemove = fields[index];
    setRemovingSkillId(fieldToRemove.id);

    setIsSubmitting(true);
    try {
      // If skill exists in database, delete it
      // Use the portfolio_skill_id if available, otherwise use the skill's item_id
      const field = fields[index] as unknown as SkillFormValues & {
        portfolio_skill_id?: number;
      };
      const skillId = field.portfolio_skill_id || itemId;

      if (skillId && portfolioId) {
        const { error } = await deleteSkill(skillId, Number(portfolioId));

        if (error) {
          throw new Error(`Failed to delete skill: ${error.message}`);
        }
      }

      // Small delay to allow animation to complete
      setTimeout(() => {
        // Always remove from form state
        remove(index);
        setRemovingSkillId(null);
        toast.success("Skill removed");
      }, 200);
    } catch (error) {
      console.error("Error removing skill:", error);
      toast.error("Failed to remove skill");
      setRemovingSkillId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to get icon and color for database skills
  const getDbSkillDetails = (skillName: string) => {
    // Find in COMMON_SKILLS for visual presentation (icon/color)
    const commonSkill = COMMON_SKILLS.find(
      (s) => s.name.toLowerCase() === skillName.toLowerCase()
    );

    return {
      icon: commonSkill?.icon || CodeIcon,
      color: commonSkill?.color || "#718096",
      category: commonSkill?.category || "tool", // Default category if not found
    };
  };

  // Process and enhance skills data from props
  const processSkillsData = (skills: any[] | null): EnhancedDbSkill[] => {
    if (!skills) return [];
    return skills
      .filter((skill) => skill && typeof skill === "object")
      .map((skill) => {
        // If we don't have a name, try to extract it from nested objects or return a default
        const skillName =
          typeof skill.name === "string"
            ? skill.name
            : skill.skills && typeof skill.skills.name === "string"
              ? skill.skills.name
              : "Unknown Skill";

        // Get visual details for this skill
        const details = getDbSkillDetails(skillName);

        // Extract the nested skill data if present
        const nestedSkill =
          skill.skills &&
          typeof skill.skills === "object" &&
          !Array.isArray(skill.skills)
            ? skill.skills
            : null;

        // Determine the main skill ID
        const mainSkillId =
          typeof (nestedSkill?.id ?? skill.id) === "number"
            ? (nestedSkill?.id ?? skill.id)
            : 0;

        // Determine the portfolio_skill relation ID if present
        const portfolioSkillId =
          nestedSkill && typeof skill.id === "number" ? skill.id : undefined;

        // Determine category ID from any available source
        const categoryId = String(
          nestedSkill?.category_id ??
            skill.category_id ??
            nestedSkill?.category ??
            skill.category ??
            details.category
        );

        // Extract category name if available
        let categoryName = "";
        if (
          skill.category &&
          typeof skill.category === "object" &&
          skill.category !== null &&
          "name" in skill.category
        ) {
          categoryName = String(skill.category.name);
        } else if (skill.category_name) {
          categoryName = String(skill.category_name);
        }

        // Return a normalized skill object
        return {
          id: mainSkillId,
          name: skillName,
          icon: details.icon,
          color: details.color,
          category: categoryId,
          category_name: categoryName,
          portfolio_skill_id: portfolioSkillId,
          // Also include the original data for reference
          original: skill,
        };
      });
  };

  // Convert skillsData from props to enhanced skills with icons and colors
  const dbSkillsWithDetails = processSkillsData(skillsData);

  // Filter skills based on search query and category
  const filteredDbSkills = dbSkillsWithDetails.filter((skill) => {
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? skill.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  // Determine which skills to display - use skills from props or fallback to COMMON_SKILLS
  const displaySkills = skillsData ? filteredDbSkills : [];

  // Process categories data from props
  const displayCategories = categoriesData
    ? categoriesData.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        icon:
          SKILL_CATEGORIES.find((cat) => cat.slug === category.slug)?.icon ||
          CodeIcon,
      }))
    : [];

  // Group skills by category
  const categorizedSkills = displayCategories
    .map((category) => {
      const categorySkills = displaySkills.filter(
        (skill) => skill.category === category.slug
      );

      return {
        ...category,
        skills: categorySkills,
      };
    })
    .filter((category) => category.skills.length > 0);

  // Get a list of popular skills from skillsData props
  const topDbSkills =
    skillsData && skillsData.length > 0
      ? skillsData
          .filter((skill) => TOP_SKILLS.includes(skill.name))
          .map((skill) => ({
            name: skill.name,
            id: skill.id,
          }))
      : [];

  // Filter top skills that haven't been added yet
  const availableTopSkills = topDbSkills.filter(
    (skill) => !isSkillAlreadyAdded(skill.name)
  );

  return (
    <div className="space-y-6">
      <div className="mobile-borderless-card sm:rounded-xl sm:border sm:bg-card">
        <div className="px-0 pt-0 sm:p-6 relative">
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
                <div className="flex flex-wrap gap-2 justify-center">
                  {skillsData?.length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      No skills available in the database yet.
                    </p>
                  ) : availableTopSkills.length > 0 ? (
                    availableTopSkills.map((skill) => (
                      <Button
                        key={skill.name}
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleQuickAddSkill(skill.name, skill.id)
                        }
                        className="h-8"
                      >
                        <PlusCircleIcon className="mr-1 size-3" />
                        {skill.name}
                      </Button>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No more skills available to add.
                    </p>
                  )}
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
                <AnimatePresence>
                  {fields.map((field, index) => {
                    const skill = field as unknown as SkillFormValues;
                    const SkillIcon = getSkillIcon(skill.name);
                    const skillColor = getSkillColor(skill.name);

                    return (
                      <SkillCard
                        key={field.id}
                        id={field.id}
                        name={skill.name}
                        Icon={SkillIcon}
                        color={skillColor}
                        index={index}
                        onRemove={() => handleRemoveSkill(index, skill.item_id)}
                        isRemoving={removingSkillId === field.id}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Quick-add section for skills */}
              {skillsData &&
                skillsData.length > 0 &&
                availableTopSkills.length > 0 && (
                  <div className="mt-4 space-y-4 rounded-lg border bg-background p-4">
                    <h4 className="text-sm font-medium">
                      Quick add popular skills:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {availableTopSkills.slice(0, 8).map((skill) => (
                        <Button
                          key={skill.name}
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleQuickAddSkill(skill.name, skill.id)
                          }
                          className="h-8"
                        >
                          <PlusCircleIcon className="mr-1 size-3" />
                          {skill.name}
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
        <DialogContent className="sm:max-w-[700px]">
          <div>
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
              {/* Search and Category Filters */}
              <div className="flex flex-col gap-4">
                <div className="flex-1 space-y-2">
                  <FormLabel>Search Skills</FormLabel>
                  <div className="relative w-full">
                    <SearchIcon className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Type to search skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9"
                    />
                  </div>
                </div>

                {displayCategories.length > 0 && (
                  <CategoryFilter
                    /* @ts-ignore */
                    categories={displayCategories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    skills={displaySkills}
                  />
                )}
              </div>

              {/* Skills selection list */}
              <div className="max-h-[400px] overflow-y-auto rounded-md border p-4">
                {skillsData?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-muted-foreground">
                      No skills found in the database
                    </p>
                  </div>
                ) : searchQuery.length > 0 ? (
                  /* Search results */
                  displaySkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {/* Show skills that match search */}
                      {displaySkills.map((skill) => {
                        const skillId = "id" in skill ? skill.id : undefined;

                        return (
                          <Button
                            key={skill.name}
                            variant="outline"
                            size="sm"
                            disabled={isSkillAlreadyAdded(skill.name)}
                            onClick={() => {
                              if (isSkillAlreadyAdded(skill.name)) {
                                toast.error(
                                  `Skill "${skill.name}" is already added`
                                );
                                return;
                              }
                              skillForm.setValue("name", skill.name);

                              // If skill exists in the database, set the item_id
                              if (skillId) {
                                skillForm.setValue("item_id", skillId);
                              }

                              // Use a direct function call instead of handleSubmit to prevent double submission
                              handleAddSkill({
                                name: skill.name,
                                item_id: skillId,
                              });
                            }}
                            className={`flex h-8 items-center gap-1.5 ${
                              isSkillAlreadyAdded(skill.name)
                                ? "opacity-50"
                                : ""
                            }`}
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
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-muted-foreground">
                      No skills found matching your search
                    </p>
                  )
                ) : selectedCategory ? (
                  /* Selected category skills */
                  (() => {
                    const categorySkills = displaySkills.filter(
                      (skill) => skill.category === selectedCategory
                    );

                    return categorySkills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => {
                          const skillId = "id" in skill ? skill.id : undefined;

                          return (
                            <Button
                              key={skill.name}
                              variant="outline"
                              size="sm"
                              disabled={isSkillAlreadyAdded(skill.name)}
                              onClick={() => {
                                if (isSkillAlreadyAdded(skill.name)) {
                                  toast.error(
                                    `Skill "${skill.name}" is already added`
                                  );
                                  return;
                                }
                                skillForm.setValue("name", skill.name);

                                if (skillId) {
                                  skillForm.setValue("item_id", skillId);
                                }

                                // Use a direct function call instead of handleSubmit to prevent double submission
                                handleAddSkill({
                                  name: skill.name,
                                  item_id: skillId,
                                });
                              }}
                              className={`flex h-8 items-center gap-1.5 ${
                                isSkillAlreadyAdded(skill.name)
                                  ? "opacity-50"
                                  : ""
                              }`}
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
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-sm text-muted-foreground">
                          No skills found in this category
                        </p>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => setSelectedCategory(null)}
                          className="mt-2"
                        >
                          Show all categories
                        </Button>
                      </div>
                    );
                  })()
                ) : categorizedSkills.length > 0 ? (
                  /* Categorized skills */
                  <div className="space-y-6">
                    {categorizedSkills.map((category) => {
                      return (
                        <div key={category.id} className="space-y-2">
                          <h3 className="flex items-center gap-1.5 text-sm font-medium">
                            {React.createElement(category.icon, {
                              className: "size-4",
                            })}
                            {category.name}
                            <span className="ml-1.5 text-xs text-muted-foreground">
                              ({category.skills.length})
                            </span>
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => {
                              const skillId = skill.id;

                              return (
                                <Button
                                  key={skill.name}
                                  variant="outline"
                                  size="sm"
                                  disabled={isSkillAlreadyAdded(skill.name)}
                                  onClick={() => {
                                    if (isSkillAlreadyAdded(skill.name)) {
                                      toast.error(
                                        `Skill "${skill.name}" is already added`
                                      );
                                      return;
                                    }
                                    skillForm.setValue("name", skill.name);

                                    // If skill exists in the database, set the item_id
                                    if (skillId) {
                                      skillForm.setValue("item_id", skillId);
                                    }

                                    // Use a direct function call instead of handleSubmit to prevent double submission
                                    handleAddSkill({
                                      name: skill.name,
                                      item_id: skillId,
                                    });
                                  }}
                                  className={`flex h-8 items-center gap-1.5 ${
                                    isSkillAlreadyAdded(skill.name)
                                      ? "opacity-50"
                                      : ""
                                  }`}
                                >
                                  <div
                                    className="flex size-4 items-center justify-center rounded-full"
                                    style={{
                                      backgroundColor: `${skill.color}20`,
                                    }}
                                  >
                                    {skill.icon &&
                                      React.createElement(skill.icon, {
                                        className: "size-3",
                                        style: { color: skill.color },
                                      })}
                                  </div>
                                  {skill.name}
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      No skills have been categorized yet
                    </p>
                  </div>
                )}
              </div>

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

              {/* Hidden field for item_id */}
              <FormField
                control={skillForm.control}
                name="item_id"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input
                        type="hidden"
                        {...field}
                        value={field.value || ""}
                      />
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
