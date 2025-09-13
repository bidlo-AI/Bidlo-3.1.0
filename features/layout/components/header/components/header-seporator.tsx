import { cn } from '@/lib/utils';

export const Separator = ({ className }: { className?: string }) => (
  <div className={cn('border-r h-3.5 mx-1.5', className)} />
);
