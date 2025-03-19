import type { Portfolio as PortfolioType } from '../types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, Calendar, Code2, ExternalLink, Eye, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { itemVariants } from './MotionVariants';

const Portfolio = ({ portfolio }: { portfolio: PortfolioType }) => {
  const t = useTranslations('Portfolio');

  // Deneyim tarih formatı için yardımcı fonksiyon
  const formatDate = (dateString?: string) => {
    if (!dateString) {
      return 'Günümüz';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' });
  };

  return (
    <motion.div
      variants={itemVariants}
      className="w-full space-y-6"
    >
      {/* Ana görsel ve başlık alanı */}
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-muted shadow-md">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/70 to-muted/90">
          <Image
            src="https://saasinterface.com/wp-content/uploads/2023/07/qonto-1.png"
            alt={portfolio.title}
            fill
            className="object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
            <div>
              <Badge variant="secondary" className="mb-2 bg-primary/20 text-xs font-medium text-primary/90">
                {t('template')}
                {' '}
                {portfolio.template_id}
              </Badge>
              <h3 className="text-2xl font-bold text-foreground drop-shadow-sm">{portfolio.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="secondary" size="sm" className="gap-1 bg-background/70 backdrop-blur-sm">
                <Link href={`/${portfolio.slug}`} target="_blank">
                  <Eye className="size-3.5" />
                  {t('view')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs ile bölümlendirilmiş içerik */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">Hakkımda</TabsTrigger>
          <TabsTrigger value="projects">Projeler</TabsTrigger>
          <TabsTrigger value="experience">Deneyim</TabsTrigger>
        </TabsList>

        {/* Hakkında Tabı */}
        <TabsContent value="about" className="mt-4 space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium text-muted-foreground">
              {t('site_information')}
            </h4>
            <div className="rounded-lg border bg-card p-4">
              <h5 className="mb-1 text-xs font-medium text-muted-foreground">
                {t('about_me')}
              </h5>
              <p className="text-sm">{portfolio.about_me}</p>
            </div>

            <div className="mt-4 rounded-lg border bg-card p-4">
              <h5 className="mb-2 text-xs font-medium text-muted-foreground">
                {t('technologies')}
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {portfolio.tech_stack.split(',').map((tech, i) => (
                  <Badge key={i} variant="outline" className="border-primary/10 bg-primary/5 text-xs font-normal">
                    {tech.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Projeler Tabı */}
        <TabsContent value="projects" className="mt-4 space-y-6">
          <h4 className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Code2 className="size-4" />
            Projeler
            {portfolio.projects && (
              <Badge variant="outline" className="ml-1 text-xs">
                {portfolio.projects.length}
              </Badge>
            )}
          </h4>

          {portfolio.projects?.length
            ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {portfolio.projects.map(project => (
                    <motion.div
                      key={project.id}
                      whileHover={{ y: -5 }}
                      className="group rounded-lg border bg-card transition-all duration-300 hover:shadow-md"
                    >
                      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                        {project.image_url
                          ? (
                              <Image
                                src={project.image_url}
                                alt={project.title}
                                fill
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                              />
                            )
                          : (
                              <div className="flex h-full items-center justify-center bg-muted">
                                <Code2 className="size-12 text-muted-foreground/50" />
                              </div>
                            )}
                      </div>

                      <div className="space-y-2 p-4">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium">{project.title}</h3>
                          <div className="flex gap-1">
                            {project.github_url && (
                              <Link href={project.github_url} target="_blank" className="text-muted-foreground hover:text-foreground">
                                <Github className="size-4" />
                              </Link>
                            )}
                            {project.live_url && (
                              <Link href={project.live_url} target="_blank" className="text-muted-foreground hover:text-foreground">
                                <ExternalLink className="size-4" />
                              </Link>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1 pt-2">
                          {project.technologies.map((tech, i) => (
                            <Badge key={i} variant="secondary" className="text-[10px]">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            : (
                <Card className="flex h-24 items-center justify-center bg-muted/50">
                  <p className="text-sm text-muted-foreground">Henüz proje eklenmemiş</p>
                </Card>
              )}
        </TabsContent>

        {/* Deneyim Tabı */}
        <TabsContent value="experience" className="mt-4 space-y-6">
          <h4 className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <BriefcaseBusiness className="size-4" />
            Deneyim
            {portfolio.experiences && (
              <Badge variant="outline" className="ml-1 text-xs">
                {portfolio.experiences.length}
              </Badge>
            )}
          </h4>

          {portfolio.experiences?.length
            ? (
                <div className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-muted">
                  {portfolio.experiences.map(experience => (
                    <motion.div
                      key={experience.id}
                      whileHover={{ x: 5 }}
                      className="relative rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 before:absolute before:-left-6 before:top-4 before:size-3 before:rounded-full before:border-2 before:border-background before:bg-primary/40 before:ring before:ring-primary/10 hover:before:bg-primary"
                    >
                      <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                        <h3 className="font-medium">{experience.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="size-3.5" />
                          <span>
                            {formatDate(experience.start_date)}
                            {' '}
                            -
                            {formatDate(experience.end_date)}
                          </span>
                          {experience.current && (
                            <Badge variant="outline" className="ml-1 bg-primary/5 text-[10px] text-primary">
                              Güncel
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 flex items-center gap-1">
                        <Badge className="bg-primary/10 text-xs font-normal text-primary">
                          {experience.company}
                        </Badge>
                        {experience.location && (
                          <span className="text-xs text-muted-foreground">
                            •
                            {' '}
                            {experience.location}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground">
                        {experience.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )
            : (
                <Card className="flex h-24 items-center justify-center bg-muted/50">
                  <p className="text-sm text-muted-foreground">Henüz deneyim eklenmemiş</p>
                </Card>
              )}
        </TabsContent>
      </Tabs>

      <Separator />

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="mr-1.5 size-3.5" />
          <span>
            {t('last_updated')}
            {': '}
            {new Date(portfolio.updated_at).toLocaleDateString()}
          </span>
        </div>
        <Link
          href={`/${portfolio.slug}`}
          target="_blank"
          className="flex items-center text-primary hover:text-primary/80"
        >
          <span className="mr-1">
            {t('visit_site')}
          </span>
          <ExternalLink className="size-3.5" />
        </Link>
      </div>
    </motion.div>
  );
};

export default Portfolio;
