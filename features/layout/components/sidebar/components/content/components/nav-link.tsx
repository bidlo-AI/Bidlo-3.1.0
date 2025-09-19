import { Button } from '@/components/ui/button';
import Link from 'next/link';

const buttonClassName = 'px-2 justify-start font-medium w-full text-muted-foreground-opaque h-[30px] truncate';

export const NavLink = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => {
  return (
    <Link href={href} aria-label={label}>
      <Button className={buttonClassName} style={{ padding: '0 8px' }} variant="ghost" size="sm">
        {icon}
        {label}
      </Button>
    </Link>
  );
};

export const NavButton = ({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={onClick}
      aria-label={label}
      className={buttonClassName}
      style={{ padding: '0 8px' }}
    >
      {icon}
      {label}
    </Button>
  );
};
