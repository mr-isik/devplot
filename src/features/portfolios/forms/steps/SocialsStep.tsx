'use client';

import type { z } from 'zod';
import DynamicFormField, { FormFieldType } from '@/components/globals/DynamicFormField';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { socialSchema } from '@/lib/validations/portfolio';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinkIcon, PlusCircleIcon, Share2Icon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { FaDev, FaFacebook, FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaMedium, FaStackOverflow, FaYoutube } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

type SocialFormValues = z.infer<typeof socialSchema>;

const SOCIAL_PLATFORMS = [
  { name: 'GitHub', icon: 'github', color: '#171515' },
  { name: 'LinkedIn', icon: 'linkedin', color: '#0077B5' },
  { name: 'Twitter', icon: 'twitter', color: '#1DA1F2' },
  { name: 'Instagram', icon: 'instagram', color: '#E4405F' },
  { name: 'Facebook', icon: 'facebook', color: '#1877F2' },
  { name: 'YouTube', icon: 'youtube', color: '#FF0000' },
  { name: 'Medium', icon: 'medium', color: '#00AB6C' },
  { name: 'Dev.to', icon: 'devto', color: '#0A0A0A' },
  { name: 'Stack Overflow', icon: 'stackoverflow', color: '#F48024' },
  { name: 'Portfolio', icon: 'globe', color: '#4285F4' },
  { name: 'Other', icon: 'link', color: '#718096' },
];

export const getPlatformIcon = (platformName: string, className?: string) => {
  const platform = SOCIAL_PLATFORMS.find(p => p.name === platformName);
  switch (platform?.icon) {
    case 'github':
      return <FaGithub className={cn('size-4', className)} />;
    case 'twitter':
      return <FaSquareXTwitter className={cn('size-4', className)} />;
    case 'linkedin':
      return <FaLinkedin className={cn('size-4', className)} />;
    case 'instagram':
      return <FaInstagram className={cn('size-4', className)} />;
    case 'facebook':
      return <FaFacebook className={cn('size-4', className)} />;
    case 'youtube':
      return <FaYoutube className={cn('size-4', className)} />;
    case 'medium':
      return <FaMedium className={cn('size-4', className)} />;
    case 'devto':
      return <FaDev className={cn('size-4', className)} />;
    case 'stackoverflow':
      return <FaStackOverflow className={cn('size-4', className)} />;
    case 'portfolio':
      return <FaGlobe className={cn('size-4', className)} />;
    default:
      return <LinkIcon className={cn('size-4', className)} />;
  }
};

const getPlatformColor = (platformName: string) => {
  const platform = SOCIAL_PLATFORMS.find(p => p.name === platformName);
  return platform?.color || '#718096';
};

export default function SocialsStep() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socials',
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const socialForm = useForm<SocialFormValues>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      platform: '',
      url: '',
    },
  });

  const resetAndOpenDialog = (index?: number) => {
    if (index !== undefined && index >= 0 && index < fields.length) {
      const social = fields[index] as unknown as SocialFormValues;
      socialForm.reset({
        platform: social.platform || '',
        url: social.url || '',
      });
      setEditingIndex(index);
    } else {
      socialForm.reset({
        platform: '',
        url: '',
      });
      setEditingIndex(null);
    }
    setIsDialogOpen(true);
  };

  const handleAddSocial = (data: SocialFormValues) => {
    if (editingIndex !== null) {
      remove(editingIndex);
      append(data);
    } else {
      append(data);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="mobile-borderless-card sm:rounded-xl sm:border sm:bg-card">
        <div className="px-0 pt-0 sm:p-6">
          {fields.length === 0
            ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-background p-8 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <Share2Icon className="size-8 text-primary" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium">Connect with your audience</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Make it easy for visitors to find you on social media and other platforms. Add links to your professional profiles to expand your network.
                  </p>
                  <Button onClick={() => resetAndOpenDialog()} className="gap-1.5">
                    <PlusCircleIcon className="size-4" />
                    Add Your First Social Link
                  </Button>
                </div>
              )
            : (
                <div className="space-y-4">
                  {/* Mobile header - only visible on mobile */}
                  <div className="mb-4 flex items-center justify-between sm:hidden">
                    <h2 className="text-lg font-semibold">Social Media</h2>
                    <Button size="sm" variant="outline" onClick={() => resetAndOpenDialog()} className="gap-1">
                      <PlusCircleIcon className="size-4" />
                      Add
                    </Button>
                  </div>

                  {/* Social links grid */}
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {fields.map((field, index) => {
                      const social = field as unknown as SocialFormValues;
                      return (
                        <div key={field.id} className="mobile-card group relative">
                          <div className="mobile-card-inner rounded-lg bg-card sm:bg-transparent">
                            <div className="space-y-2">
                              <div className="flex items-start gap-3">
                                <div
                                  className="flex size-10 shrink-0 items-center justify-center rounded-full"
                                  style={{ backgroundColor: `${getPlatformColor(social.platform)}20` }}
                                >
                                  {getPlatformIcon(social.platform)}
                                </div>

                                <div className="min-w-0 grow">
                                  <div className="flex items-center justify-between">
                                    <h4 className="truncate font-medium">{social.platform}</h4>
                                    <div className="hidden shrink-0 sm:block">
                                      <div className="flex items-center gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => resetAndOpenDialog(index)}
                                          className="h-7 px-2 text-xs"
                                        >
                                          Edit
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => remove(index)}
                                          className="size-7 text-muted-foreground hover:text-destructive"
                                        >
                                          <Trash2Icon className="size-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>

                                  <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block truncate text-sm text-muted-foreground hover:underline"
                                  >
                                    {social.url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')}
                                  </a>
                                </div>
                              </div>

                              {/* Mobile actions - Only visible on mobile */}
                              <div className="mt-2 flex justify-end border-t pt-2 sm:hidden">
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
                                  onClick={() => remove(index)}
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
                      Add Social Media
                    </Button>
                  </div>
                </div>
              )}
        </div>

        {/* Count indicator for social links */}
        {fields.length > 0 && (
          <div className="mt-4 hidden border-t px-6 py-4 sm:block">
            <p className="text-sm text-muted-foreground">
              {fields.length}
              {' '}
              social link
              {fields.length !== 1 ? 's' : ''}
              {' '}
              added
            </p>
          </div>
        )}
      </div>

      {/* Dialog for adding/editing social media links */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={socialForm.handleSubmit(handleAddSocial)}>
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null ? 'Edit Social Media' : 'Add New Social Media'}
              </DialogTitle>
              <DialogDescription>
                Add your social media links
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={socialForm.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a platform" />
                          </SelectTrigger>
                          <SelectContent>
                            {SOCIAL_PLATFORMS.map(platform => (
                              <SelectItem key={platform.name} value={platform.name}>
                                <div className="flex items-center gap-2">
                                  <div
                                    className="flex size-4 items-center justify-center rounded-full"
                                    style={{ backgroundColor: `${platform.color}20` }}
                                  >
                                    {getPlatformIcon(platform.name)}
                                  </div>
                                  {platform.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DynamicFormField
                  control={socialForm.control}
                  name="url"
                  label="URL"
                  placeholder="E.g.: https://github.com/username"
                  fieldType={FormFieldType.INPUT}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
