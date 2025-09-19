import { HomeIcon } from 'lucide-react';
import { NavLink } from './nav-link';

export const Home = () => <NavLink href="/" aria-label="Home" label="Home" icon={<HomeIcon className="size-4.5" />} />;
