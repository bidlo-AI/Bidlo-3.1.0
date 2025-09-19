import { DatabaseIcon } from 'lucide-react';
import { NavLink } from './nav-link';

export const Data = () => (
  <NavLink href="/data" aria-label="Data" label="Data" icon={<DatabaseIcon className="size-4.5" />} />
);
