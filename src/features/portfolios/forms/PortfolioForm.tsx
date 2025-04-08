'use client';

import type { Portfolio as PortfolioType } from '@/features/portfolios/types';
import type { z } from 'zod';
import { createContent } from '@/actions/contents/action';
import { createEducation } from '@/actions/educations/actions';
import { createExperience } from '@/actions/experiences/actions';
import { createOption } from '@/actions/options/actions';
import { createPortfolio, updatePortfolio } from '@/actions/portfolios/actions';
import { createProject } from '@/actions/projects/actions';
import { createSkill } from '@/actions/skills/actions';
import { createSocial } from '@/actions/socials/actions';
import Loader from '@/components/globals/Loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { portfolioFormSchema } from '@/lib/validations/portfolio';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BriefcaseIcon,
  EyeIcon,
  GraduationCapIcon,
  InfoIcon,
  LinkIcon,
  Paintbrush2Icon,
  RocketIcon,
  WrenchIcon,
} from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import AppearanceStep from './steps/AppearanceStep';
import BasicInfoStep from './steps/BasicInfoStep';
import EducationsStep from './steps/EducationsStep';
import ExperiencesStep from './steps/ExperiencesStep';
import ProjectsStep from './steps/ProjectsStep';
import PublishStep from './steps/PublishStep';
import SkillsStep from './steps/SkillsStep';
import SocialsStep from './steps/SocialsStep';

// Helper function to validate media files
function validateMediaFiles(
  items: Array<any>,
  fileKey: string,
  maxSize: number,
  allowedTypes: string[],
): { valid: boolean; errorMessages: string[] } {
  const errorMessages: string[] = [];
  let valid = true;

  items.forEach((item, index) => {
    const files = item[fileKey];
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    if (!file) {
      return;
    }

    // Check file size
    if (file.size > maxSize) {
      errorMessages.push(`${index + 1}: ${item.title || item.company || 'Item'} - File too large (max ${Math.round(maxSize / 1024 / 1024)}MB)`);
      valid = false;
    }

    // Check file type
    if (!allowedTypes.some(type => file.type.includes(type))) {
      errorMessages.push(`${index + 1}: ${item.title || item.company || 'Item'} - Invalid file type (allowed: ${allowedTypes.join(', ')})`);
      valid = false;
    }
  });

  return { valid, errorMessages };
}

type PortfolioFormProps = {
  userId: string;
};

export default function PortfolioForm({ userId }: PortfolioFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('basics');

  const STEPS = [
    {
      id: 'basics',
      title: 'Basic Information',
      description: 'Main details and SEO',
      icon: <InfoIcon className="mr-2 size-4" />,
      component: <BasicInfoStep />,
    },
    {
      id: 'appearance',
      title: 'Appearance',
      description: 'Theme, colors and typography',
      icon: <Paintbrush2Icon className="mr-2 size-4" />,
      component: <AppearanceStep />,
    },
    {
      id: 'experiences',
      title: 'Experience',
      description: 'Work history',
      icon: <BriefcaseIcon className="mr-2 size-4" />,
      component: <ExperiencesStep />,
    },
    {
      id: 'educations',
      title: 'Education',
      description: 'Academic background',
      icon: <GraduationCapIcon className="mr-2 size-4" />,
      component: <EducationsStep />,
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'Your portfolio work',
      icon: <RocketIcon className="mr-2 size-4" />,
      component: <ProjectsStep />,
    },
    {
      id: 'skills',
      title: 'Skills',
      description: 'Showcase your expertise',
      icon: <WrenchIcon className="mr-2 size-4" />,
      component: <SkillsStep />,
    },
    {
      id: 'socials',
      title: 'Social Media',
      description: 'Connect online',
      icon: <LinkIcon className="mr-2 size-4" />,
      component: <SocialsStep />,
    },
    {
      id: 'publish',
      title: 'Publish',
      description: 'Review and publish',
      icon: <EyeIcon className="mr-2 size-4" />,
      component: <PublishStep preview={showPreview} portfolioId={undefined} />,
    },
  ];

  const defaultValues: z.infer<typeof portfolioFormSchema> = {
    portfolio: {
      is_published: false,
    },
    options: {
      theme: 'light',
      font: 'inter',
    },
    content: {
      hero_header: '',
      hero_description: '',
      meta_title: '',
      meta_description: '',
      about_text: '',
    },
    experiences: [],
    educations: [],
    projects: [],
    skills: [],
    socials: [],
  };

  const form = useForm<z.infer<typeof portfolioFormSchema>>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const handleSubmitPortfolio = async () => {
    setIsSubmitting(true);
    const formValues = form.getValues();

    try {
      const { valid: validExperienceLogos, errorMessages: expErrors } = validateMediaFiles(
        formValues.experiences,
        'logo',
        1024 * 1024 * 1, // 1MB
        ['image/'],
      );

      const { valid: validProjectImages, errorMessages: projErrors } = validateMediaFiles(
        formValues.projects,
        'image',
        1024 * 1024 * 4, // 4MB
        ['image/'],
      );

      if (!validExperienceLogos) {
        toast.error('Experience logos have validation issues', {
          description: expErrors.join('\n'),
          duration: 5000,
        });
      }

      if (!validProjectImages) {
        toast.error('Project images have validation issues', {
          description: projErrors.join('\n'),
          duration: 5000,
        });
      }

      if (!validExperienceLogos || !validProjectImages) {
        setIsSubmitting(false);
        return false;
      }

      const { data: portfolioData, error: portfolioError } = await createPortfolio({
        user_id: userId,
        is_published: formValues.portfolio.is_published,
      });

      if (portfolioError) {
        throw new Error(`Failed to create portfolio: ${portfolioError.message}`);
      }

      if (!portfolioData || portfolioData.length === 0 || !portfolioData[0]?.id) {
        throw new Error('No portfolio ID returned from API');
      }

      const portfolioId = portfolioData[0].id;

      const { error: contentError } = await createContent(formValues.content, portfolioId);
      if (contentError) {
        throw new Error(`Failed to create content: ${contentError.message}`);
      }

      const optionData = {
        portfolio_id: portfolioId,
        options: JSON.stringify(formValues.options),
      };

      const { error: optionError } = await createOption(optionData, portfolioId);
      if (optionError) {
        throw new Error(`Failed to create options: ${optionError.message}`);
      }

      if (formValues.experiences.length > 0) {
        const experiencePromises = formValues.experiences.map((experience, index) => {
          return createExperience({
            company: experience.company,
            role: experience.role,
            description: experience.description,
            start_date: experience.start_date,
            end_date: experience.end_date === 'Present' ? undefined : experience.end_date,
            employment_type: experience.employment_type,
            logo: experience.logo,
          }, portfolioId).then(result => ({
            result,
            index,
            experience,
          }));
        });

        try {
          const experienceResults = await Promise.allSettled(experiencePromises);

          const failedExperiences = experienceResults
            .filter((result): result is PromiseRejectedResult => result.status === 'rejected');

          const errorsInFulfilled = experienceResults
            .filter((result): result is PromiseFulfilledResult<{ result: any; index: number; experience: any }> =>
              result.status === 'fulfilled' && result.value.result.error !== null && result.value.result.error !== undefined)
            .map((result: PromiseFulfilledResult<{ result: any; index: number; experience: any }>) => ({
              error: result.value.result.error,
              index: result.value.index,
              experience: result.value.experience,
            }));

          if (failedExperiences.length > 0) {
            console.error('Failed experience uploads (rejected promises):', failedExperiences.map(f => f.reason),
            );

            toast.error(`${failedExperiences.length} experiences failed to save due to rejected promises`, {
              description: 'Check console for details',
              duration: 5000,
            });
          }

          if (errorsInFulfilled.length > 0) {
            console.error('Experience errors from fulfilled promises:', errorsInFulfilled.map(e => ({
              company: e.experience.company,
              role: e.experience.role,
              error: e.error,
            })));

            const mediaErrors = errorsInFulfilled.filter((e) => {
              if (!e.error || typeof e.error !== 'object') {
                return false;
              }
              const errorMessage = e.error?.message;
              return typeof errorMessage === 'string' && (
                errorMessage.includes('storage')
                || errorMessage.includes('file')
                || errorMessage.includes('upload')
                || errorMessage.includes('image')
                || errorMessage.includes('logo')
              );
            });

            if (mediaErrors.length > 0) {
              toast.error(`${mediaErrors.length} experiences have media upload issues`, {
                description: 'Please ensure logos are under 1MB and in valid image format',
                duration: 5000,
              });
            } else if (errorsInFulfilled.length > 0) {
              toast.error(`${errorsInFulfilled.length} experiences couldn't be saved due to errors`, {
                description: errorsInFulfilled[0]?.error?.message || 'Check console for details',
                duration: 5000,
              });
            }
          }
        } catch (error) {
          console.error('Unexpected error handling experiences:', error);
          toast.error('Failed to process experiences data');
        }
      }

      if (formValues.educations.length > 0) {
        const educationPromises = formValues.educations.map((education) => {
          return createEducation({
            school: education.school,
            degree: education.degree,
            field: education.field,
            start_date: education.start_date,
            end_date: education.end_date === 'Present' ? null : education.end_date || null,
            portfolio_id: portfolioId,
          }, portfolioId);
        });

        const educationResults = await Promise.allSettled(educationPromises);
        const failedEducations = educationResults
          .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
          .length;

        if (failedEducations > 0) {
          toast.error(`${failedEducations} out of ${formValues.educations.length} educations could not be saved`);
        }
      }

      if (formValues.projects.length > 0) {
        const projectPromises = formValues.projects.map((project, index) => {
          return createProject({
            title: project.title,
            description: project.description,
            repo_url: project.repo_url,
            live_url: project.live_url,
            image: project.image,
          }, portfolioId).then(result => ({
            result,
            index,
            project,
          }));
        });

        try {
          const projectResults = await Promise.allSettled(projectPromises);

          const failedProjects = projectResults
            .filter((result): result is PromiseRejectedResult => result.status === 'rejected');

          const errorsInFulfilled = projectResults
            .filter((result): result is PromiseFulfilledResult<{ result: any; index: number; project: any }> =>
              result.status === 'fulfilled' && result.value.result.error !== null && result.value.result.error !== undefined)
            .map((result: PromiseFulfilledResult<{ result: any; index: number; project: any }>) => ({
              error: result.value.result.error,
              index: result.value.index,
              project: result.value.project,
            }));

          if (failedProjects.length > 0) {
            console.error('Failed project uploads (rejected promises):', failedProjects.map(f => f.reason),
            );

            toast.error(`${failedProjects.length} projects failed to save due to rejected promises`, {
              description: 'Check console for details',
              duration: 5000,
            });
          }

          if (errorsInFulfilled.length > 0) {
            console.error('Project errors from fulfilled promises:', errorsInFulfilled.map(e => ({
              title: e.project.title,
              error: e.error,
            })));

            const mediaErrors = errorsInFulfilled.filter((e) => {
              if (!e.error || typeof e.error !== 'object') {
                return false;
              }
              const errorMessage = e.error?.message;
              return typeof errorMessage === 'string' && (
                errorMessage.includes('storage')
                || errorMessage.includes('file')
                || errorMessage.includes('upload')
                || errorMessage.includes('image')
              );
            });

            if (mediaErrors.length > 0) {
              toast.error(`${mediaErrors.length} projects have media upload issues`, {
                description: 'Please ensure images are under 4MB and in valid image format',
                duration: 5000,
              });
            } else if (errorsInFulfilled.length > 0) {
              toast.error(`${errorsInFulfilled.length} projects couldn't be saved due to errors`, {
                description: errorsInFulfilled[0]?.error?.message || 'Check console for details',
                duration: 5000,
              });
            }
          }
        } catch (error) {
          console.error('Unexpected error handling projects:', error);
          toast.error('Failed to process projects data');
        }
      }

      if (formValues.skills.length > 0) {
        const skillPromises = formValues.skills.map((skill) => {
          return createSkill({
            name: skill.name,
            portfolio_id: portfolioId,
          });
        });

        const skillResults = await Promise.allSettled(skillPromises);
        const failedSkills = skillResults
          .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
          .length;

        if (failedSkills > 0) {
          toast.error(`${failedSkills} out of ${formValues.skills.length} skills could not be saved`);
        }
      }

      if (formValues.socials.length > 0) {
        const socialPromises = formValues.socials.map((social) => {
          return createSocial({
            platform: social.platform,
            url: social.url,
            portfolio_id: portfolioId,
          });
        });

        const socialResults = await Promise.allSettled(socialPromises);
        const failedSocials = socialResults
          .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
          .length;

        if (failedSocials > 0) {
          toast.error(`${failedSocials} out of ${formValues.socials.length} socials could not be saved`);
        }
      }

      await updatePortfolio({
        id: portfolioId,
        is_published: formValues.portfolio.is_published,
      } as PortfolioType);

      toast.success('Portfolio created successfully!');

      return true;
    } catch (error: any) {
      console.error('Error creating portfolio:', error);
      toast.error('Failed to create portfolio', {
        description: error?.message || 'Unexpected error occurred',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepComplete = async (stepId: string) => {
    try {
      let isValid = false;

      switch (stepId) {
        case 'basics':
          isValid = await form.trigger(['content', 'portfolio']);
          break;
        case 'appearance':
          isValid = await form.trigger('options');
          break;
        case 'experiences':
          isValid = true;
          break;
        case 'educations':
          isValid = true;
          break;
        case 'projects':
          isValid = true;
          break;
        case 'skills':
          isValid = true;
          break;
        case 'socials':
          isValid = true;
          break;
        case 'publish':
          isValid = await form.trigger();
          break;
        default:
          isValid = true;
      }

      if (!isValid) {
        toast.error('Please fill in all required fields correctly', {
          description: 'Fix the errors before continuing',
        });
        return;
      }

      const currentStepIndex = STEPS.findIndex(step => step.id === stepId);
      if (currentStepIndex === STEPS.length - 1) {
        await handleSubmitPortfolio();
        return;
      }

      if (currentStepIndex < STEPS.length - 1) {
        const nextStep = STEPS[currentStepIndex + 1];
        if (nextStep) {
          setActiveTab(nextStep.id);
        }
      }
    } catch (err) {
      console.error('Form validation error:', err);
      toast.error('Please fill in all required fields');
    }
  };

  const _togglePreview = () => {
    setShowPreview(true);
    setActiveTab('publish');
  };

  return (
    <FormProvider {...form}>
      <div className="flex h-full flex-col">
        <Card className="min-h-[calc(100vh-250px)] border-none bg-transparent sm:min-h-[600px] sm:border">
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex h-full flex-col sm:flex-row"
            >
              {/* Mobile Tab Bar - Only visible on mobile */}
              <div className="sticky top-0 z-10 border-b bg-background sm:hidden">
                <div className="mb-2 flex items-center p-4">
                  <h1 className="text-xl font-bold">Portfolio Builder</h1>
                </div>
                <div className="no-scrollbar overflow-x-auto px-4 pb-2">
                  <TabsList className="inline-flex h-10 w-auto">
                    {STEPS.map(step => (
                      <TabsTrigger
                        key={step.id}
                        value={step.id}
                        className="h-9 whitespace-nowrap px-4"
                      >
                        <div className="flex items-center">
                          {step.icon}
                          <span className="ml-1.5">{step.title}</span>
                        </div>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              {/* Desktop Sidebar - Hidden on mobile */}
              <div className="hidden sm:block sm:min-w-[200px] sm:max-w-[250px] sm:pr-6">
                <TabsList className="grid h-auto w-full grid-cols-1 sm:justify-start">
                  {STEPS.map(step => (
                    <TabsTrigger
                      key={step.id}
                      value={step.id}
                      className="h-auto px-4 py-3 data-[state=active]:bg-muted sm:w-full sm:justify-start"
                    >
                      <div className="flex items-center">
                        {step.icon}
                        <span className="ml-2">{step.title}</span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="p-4">
                  {(() => {
                    const activeTabIndex = STEPS.findIndex(step => step.id === activeTab);

                    if (activeTabIndex < STEPS.length - 1) {
                      return (
                        <>
                          <Button
                            variant="default"
                            className="mb-2 w-full"
                            onClick={() => handleStepComplete(activeTab)}
                            disabled={isSubmitting}
                          >
                            <Loader state={isSubmitting}>
                              Continue
                            </Loader>
                          </Button>

                          {activeTabIndex > 1 && (
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                const prevStep = STEPS[activeTabIndex - 1];
                                if (prevStep) {
                                  setActiveTab(prevStep.id);
                                }
                              }}
                            >
                              Back
                            </Button>
                          )}
                        </>
                      );
                    } else {
                      return (
                        <>
                          <Button
                            className="mb-2 w-full"
                            onClick={() => handleSubmitPortfolio()}
                            disabled={isSubmitting}
                          >
                            <Loader state={isSubmitting}>
                              Create
                            </Loader>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                              const prevStep = STEPS[activeTabIndex - 1];
                              if (prevStep) {
                                setActiveTab(prevStep.id);
                              }
                            }}
                          >
                            Back
                          </Button>
                        </>
                      );
                    }
                  })()}
                </div>
              </div>

              {/* Content Area */}
              <div className="steps-container flex-1">
                {STEPS.map(step => (
                  <TabsContent
                    key={step.id}
                    value={step.id}
                    className="mt-0 border-0 p-0"
                  >
                    <div className="space-y-6">
                      <div className="mb-6 hidden md:block">
                        <h1 className="text-2xl font-bold tracking-tight">{step.title}</h1>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                      {step.component}
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Mobile Bottom Action Bar - Fixed at bottom */}
        <div className="fixed inset-x-0 bottom-0 flex justify-between border-t bg-background p-4 sm:hidden">
          {(() => {
            const activeTabIndex = STEPS.findIndex(step => step.id === activeTab);

            if (activeTabIndex < STEPS.length - 1) {
              return (
                <>
                  <Button
                    variant="default"
                    onClick={() => handleStepComplete(activeTab)}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Processing...' : 'Continue'}
                  </Button>

                  {activeTabIndex > 0 && (
                    <Button
                      variant="outline"
                      className="ml-2 flex-1"
                      onClick={() => {
                        const prevStep = STEPS[activeTabIndex - 1];
                        if (prevStep) {
                          setActiveTab(prevStep.id);
                        }
                      }}
                    >
                      Back
                    </Button>
                  )}
                </>
              );
            } else {
              return (
                <>
                  <Button
                    onClick={() => handleSubmitPortfolio()}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Saving...' : 'Create'}
                  </Button>
                  <Button
                    variant="outline"
                    className="ml-2 flex-1"
                    onClick={() => {
                      const prevStep = STEPS[activeTabIndex - 1];
                      if (prevStep) {
                        setActiveTab(prevStep.id);
                      }
                    }}
                  >
                    Back
                  </Button>
                </>
              );
            }
          })()}
        </div>

        <div className="h-16 sm:hidden"></div>
      </div>
    </FormProvider>
  );
}
