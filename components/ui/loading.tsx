import { cn } from '@/lib/utils';
import { Observable } from '@legendapp/state';
import { Show } from '@legendapp/state/react';

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

interface Loading$Props extends ISVGProps {
  loading$: Observable<boolean>;
}

export const Loading$ = ({ size = 24, className, loading$, ...props }: Loading$Props) => {
  return (
    <Show if={loading$}>
      <Loading size={size} className={className} {...props} />
    </Show>
  );
};

export const Loading = ({ size = 24, className, ...props }: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('animate-spin', className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
