import { SidebarWrapper } from './wrapper';
import { SidebarContent } from './components/content';

export const Sidebar = ({ startingWidth }: { startingWidth?: number }) => {
  return (
    <SidebarWrapper startingWidth={startingWidth}>
      <SidebarContent />
    </SidebarWrapper>
  );
};
