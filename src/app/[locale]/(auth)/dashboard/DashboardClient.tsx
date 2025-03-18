'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { AlertCircle, Edit, Eye, PlusCircle, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
};

type Portfolio = {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  imageUrl?: string;
};

const portfolios: Portfolio[] = [
  {
    id: '1',
    title: 'Portfolio 1',
    description: 'Portfolio 1 description',
    updatedAt: '2024-01-01',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

export default function DashboardClient() {
  const hasPortfolios = false;
  const t = useTranslations('Dashboard');

  return (
    <motion.div
      className="space-y-8 py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2">
        <motion.h1
          className="text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {t('welcome_message')}
        </motion.h1>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t('description')}
        </motion.p>
      </div>

      {hasPortfolios
        ? (
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {portfolios.map((portfolio: Portfolio, index: number) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
                      <CardHeader className="pb-2">
                        <CardTitle>{portfolio.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{portfolio.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="relative aspect-video w-full bg-muted">
                          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            Site Önizlemesi
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-4">
                        <div className="text-xs text-muted-foreground">
                          {t('last_updated')}
                          :
                          {portfolio.updatedAt}
                        </div>
                        <div className="flex gap-2">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="outline" size="icon" title={t('view')}>
                              <Eye className="size-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="outline" size="icon" title={t('edit')}>
                              <Edit className="size-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="outline" size="icon" title={t('delete')} className="text-destructive">
                              <Trash2 className="size-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        : (
            <motion.div
              className="flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
            >
              <motion.div
                className="relative mb-6 flex size-24 items-center justify-center rounded-full bg-primary/10"
                variants={pulseVariants}
                animate="pulse"
              >
                <AlertCircle className="size-12 text-primary" />
                <span
                  className="absolute -right-1 -top-1 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <PlusCircle className="size-6" />
                </span>
              </motion.div>
              <motion.h2
                className="mb-2 text-2xl font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                {t('no_portfolio')}
              </motion.h2>
              <motion.p
                className="mb-6 max-w-md text-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                {t('create_portfolio_description')}
              </motion.p>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  className="group relative overflow-hidden px-8 py-6 transition-all duration-300 hover:shadow-lg"
                  size="lg"
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <PlusCircle className="size-5" />
                    <span className="font-medium">{t('create_first_portfolio')}</span>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-primary/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          )}
    </motion.div>
  );
}
