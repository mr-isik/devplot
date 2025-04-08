'use client';

import type { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  COMMON_SKILLS,
  getSkillColor,
  getSkillIcon,
  SKILL_CATEGORIES,
} from '@/lib/skillsData';
import { skillSchema } from '@/lib/validations/portfolio';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircleIcon, TrashIcon, WrenchIcon } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

type SkillFormValues = z.infer<typeof skillSchema>;

export default function SkillsStep() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const skillForm = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
    },
  });

  const selectedSkillName = skillForm.watch('name');

  const resetAndOpenDialog = (index?: number) => {
    if (index !== undefined && index >= 0 && index < fields.length) {
      const skill = fields[index] as unknown as SkillFormValues;
      skillForm.reset({
        name: skill.name || '',
      });
      setEditingIndex(index);
    } else {
      skillForm.reset({
        name: '',
      });
      setEditingIndex(null);
    }
    setIsDialogOpen(true);
  };

  const handleAddSkill = async (data: SkillFormValues) => {
    try {
      setIsSubmitting(true);

      const isValid = await skillForm.trigger();
      if (!isValid) {
        return;
      }

      if (editingIndex !== null) {
        remove(editingIndex);
        append(data);
      } else {
        append(data);
      }

      setIsDialogOpen(false);
      toast.success(editingIndex !== null ? 'Skill updated' : 'Skill added');

      skillForm.reset();
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error('Failed to add skill');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveSkill = async (index: number) => {
    try {
      remove(index);

      toast.success('Skill removed');
    } catch (error) {
      console.error('Error removing skill:', error);
      toast.error('Failed to remove skill');
    }
  };

  const comboboxItems = COMMON_SKILLS.map(skill => ({
    value: skill.name,
    label: skill.name,
    icon: (
      <div
        className="flex size-5 items-center justify-center rounded-full"
        style={{ backgroundColor: `${skill.color}20` }}
      >
        {skill.icon && React.createElement(skill.icon, {
          className: 'size-3',
          style: { color: skill.color },
        })}
      </div>
    ),
    group: skill.category,
  }));

  return (
    <div className="space-y-6">
      <div className="mobile-borderless-card sm:rounded-xl sm:border sm:bg-card">
        <div className="px-0 pt-0 sm:p-6">
          {fields.length === 0
            ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-background p-8 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <WrenchIcon className="size-8 text-primary" />
                  </div>
                  <h3 className="mb-1 text-xl font-medium">Showcase your skills</h3>
                  <p className="mb-4 max-w-md text-sm text-muted-foreground">
                    Add your technical skills, programming languages, tools, and soft skills to demonstrate your expertise and help employers find you.
                  </p>
                  <Button onClick={() => resetAndOpenDialog()} className="gap-1.5" size="lg">
                    <PlusCircleIcon className="size-4" />
                    Add Your First Skill
                  </Button>
                </div>
              )
            : (
                <div className="space-y-4">
                  {/* Mobile header - only visible on mobile */}
                  <div className="mb-4 flex items-center justify-between sm:hidden">
                    <h2 className="text-lg font-semibold">Skills</h2>
                    <Button size="sm" variant="outline" onClick={() => resetAndOpenDialog()} className="gap-1">
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

                  {/* Desktop add button - only visible on desktop */}
                  <div className="mt-6 hidden sm:block">
                    <Button onClick={() => resetAndOpenDialog()} className="gap-1.5">
                      <PlusCircleIcon className="size-4" />
                      Add Skill
                    </Button>
                  </div>
                </div>
              )}
        </div>

        {/* Count indicator for skills */}
        {fields.length > 0 && (
          <div className="mt-4 hidden border-t px-6 py-4 sm:block">
            <p className="text-sm text-muted-foreground">
              {fields.length}
              {' '}
              skill
              {fields.length !== 1 ? 's' : ''}
              {' '}
              added
            </p>
          </div>
        )}
      </div>

      {/* Dialog for adding skills */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={skillForm.handleSubmit(handleAddSkill)}>
            <DialogHeader>
              <DialogTitle>{editingIndex !== null ? 'Edit Skill' : 'Add Skill'}</DialogTitle>
              <DialogDescription>
                {editingIndex !== null
                  ? 'Update this skill in your portfolio.'
                  : 'Add a new skill to your portfolio.'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <FormField
                control={skillForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a Skill</FormLabel>
                    <FormControl>
                      <Combobox
                        items={comboboxItems}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Search for a skill..."
                        searchPlaceholder="Search skills..."
                        emptyMessage="No skill found."
                        groups={SKILL_CATEGORIES}
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
              <Button
                type="submit"
                disabled={isSubmitting || !selectedSkillName}
              >
                {isSubmitting
                  ? 'Processing...'
                  : editingIndex !== null
                    ? 'Update Skill'
                    : 'Add Skill'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
