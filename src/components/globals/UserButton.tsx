'use client';

import { signout } from '@/actions/auth/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  CreditCard,
  LifeBuoy,
  LogOut,
  Mail,
  UserCircle,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export function UserButton() {
  const t = useTranslations('UserButton');
  const router = useRouter();
  const handleSignout = async () => {
    await signout();
    router.push('/');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative w-full justify-start rounded-full">
          <UserCircle size={20} />
          <span>{t('account')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end" sideOffset={8}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2 px-2 py-1">
            <Avatar className="size-8">
              <AvatarImage src="/avatar.png" alt="Kullanıcı Avatar" />
              <AvatarFallback className="bg-primary/10 text-primary">KA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">Kullanıcı Adı</p>
              <p className="truncate text-xs text-muted-foreground">kullanici@ornek.com</p>
            </div>
          </div>
          <div className="border-t border-border" />
          <div className="flex flex-col space-y-1">
            <Button variant="ghost" size="sm" className="justify-start">
              <CreditCard className="mr-2 size-4" />
              <span>{t('manage_subscription')}</span>
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <Mail className="mr-2 size-4" />
              <span>{t('email_settings')}</span>
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <LifeBuoy className="mr-2 size-4" />
              <span>{t('feedback')}</span>
            </Button>
          </div>
          <div className="border-t border-border" />
          <Button onClick={handleSignout} variant="ghost" size="sm" className="justify-start text-destructive hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="mr-2 size-4" />
            <span>{t('logout')}</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
