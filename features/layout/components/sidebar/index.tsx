import { SidebarWrapper } from './components/wrapper';
import { SidebarContent } from './components/content';

export const Sidebar = ({ startingWidth }: { startingWidth?: number }) => {
  console.log('content -server');

  return (
    <div className="hidden md:flex">
      <SidebarWrapper startingWidth={startingWidth}>
        <SidebarContent />
      </SidebarWrapper>
    </div>
  );
};
