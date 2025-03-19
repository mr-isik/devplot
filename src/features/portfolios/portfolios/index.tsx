'use client';

import type { Portfolio as PortfolioType } from '../types';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AlertCircle, Edit, PlusCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { buttonVariants, containerVariants, pulseVariants } from './MotionVariants';
import Portfolio from './portfolio';

// Bu mock veri daha sonra backend'den alınacak
const userPortfolio: PortfolioType | null = {
  id: '1',
  user_id: '1',
  slug: 'portfolio-1',
  title: 'Benim Portfolyom',
  template_id: '1',
  about_me: 'Yazılım geliştiricisi ve tasarımcı',
  tech_stack: 'React,Next.js,TypeScript,Tailwind CSS',
  created_at: '2024-01-01',
  updated_at: '2024-08-01',
  projects: [
    {
      id: '1',
      title: 'E-Ticaret Projesi',
      description: 'Modern ve kullanıcı dostu bir e-ticaret platformu. Ürün arama, filtreleme, sepet ve ödeme işlemleri.',
      image_url: 'https://saasinterface.com/wp-content/uploads/2023/06/storename.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      live_url: 'https://example-ecommerce.com',
      github_url: 'https://github.com/username/ecommerce',
      order: 1,
    },
    {
      id: '2',
      title: 'Sosyal Medya Uygulaması',
      description: 'Kullanıcıların paylaşım yapabildiği, mesajlaşabildiği ve etkileşimde bulunabildiği bir sosyal medya platformu.',
      image_url: 'https://saasinterface.com/wp-content/uploads/2023/06/social.png',
      technologies: ['React Native', 'Firebase', 'Redux', 'Express'],
      live_url: 'https://example-social.com',
      github_url: 'https://github.com/username/social',
      order: 2,
    },
  ],
  experiences: [
    {
      id: '1',
      title: 'Kıdemli Frontend Geliştirici',
      company: 'Tech Innovations Ltd.',
      location: 'İstanbul, Türkiye',
      start_date: '2022-03-01',
      current: true,
      description: 'Modern web uygulamaları geliştirme, performans optimizasyonu ve takım liderliği.',
      order: 1,
    },
    {
      id: '2',
      title: 'Full Stack Geliştirici',
      company: 'Dijital Çözümler A.Ş.',
      location: 'Ankara, Türkiye',
      start_date: '2020-06-01',
      end_date: '2022-02-28',
      current: false,
      description: 'E-ticaret platformları, CRM sistemleri ve mobil uygulamalar geliştirme.',
      order: 2,
    },
    {
      id: '3',
      title: 'Junior Web Geliştirici',
      company: 'StartUp Studio',
      location: 'İzmir, Türkiye',
      start_date: '2018-09-01',
      end_date: '2020-05-31',
      current: false,
      description: 'Web siteleri ve küçük ölçekli web uygulamaları geliştirme.',
      order: 3,
    },
  ],
};

export default function Portfolios() {
  const hasPortfolio = userPortfolio !== null;
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

      {hasPortfolio
        ? (
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {t('portfolio')}
                </h2>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/settings">
                    <Edit className="mr-2 size-4" />
                    {t('edit')}
                  </Link>
                </Button>
              </div>

              <Portfolio portfolio={userPortfolio} />
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
                  asChild
                >
                  <Link href="/dashboard/create">
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
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          )}
    </motion.div>
  );
}
