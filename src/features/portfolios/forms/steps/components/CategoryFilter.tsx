import React from "react";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { CodeIcon } from "lucide-react";

// Define the SkillDisplayItem interface
export interface SkillDisplayItem {
  id?: number | string;
  name: string;
  icon: React.ElementType;
  color: string;
  category?: string;
  category_name?: string;
  skills?: SkillDisplayItem[];
}

interface CategoryFilterProps {
  categories: {
    id: string;
    name: string;
    slug: string;
    icon: any;
  }[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  skills: any[];
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  skills,
}: CategoryFilterProps) {
  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between">
        <FormLabel>Category</FormLabel>
        {selectedCategory && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onSelectCategory(null)}
            className="h-6 px-2 text-xs text-muted-foreground"
          >
            Clear filter
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Button
          type="button"
          size="sm"
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onSelectCategory(null)}
          className="h-9"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            type="button"
            size="sm"
            variant={selectedCategory === category.slug ? "default" : "outline"}
            onClick={() => onSelectCategory(category.slug)}
            className="h-9"
          >
            {React.createElement(category.icon || CodeIcon, {
              className: "mr-1.5 size-3.5",
            })}
            {category.name}
            {(() => {
              const count = skills.filter(
                (skill) => skill.category === category.slug
              ).length;

              return count > 0 ? (
                <span className="ml-1.5 inline-flex h-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-xs font-medium text-primary">
                  {count}
                </span>
              ) : null;
            })()}
          </Button>
        ))}
      </div>
    </div>
  );
}
