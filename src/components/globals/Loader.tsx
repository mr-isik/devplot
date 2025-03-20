import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

type Props = {
  state: boolean;
  className?: string;
  children: React.ReactNode;
};

const Loader = ({ state, children, className }: Props) => {
  return state
    ? (
        <div className={cn(className)}>
          <Loader2 className="size-4 animate-spin" />
        </div>
      )
    : (
        children
      );
};

export default Loader;
