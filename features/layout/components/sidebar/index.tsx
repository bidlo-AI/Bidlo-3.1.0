import { SidebarWrapper } from './wrapper';

export const Sidebar = ({ startingWidth }: { startingWidth?: number }) => {
  return (
    <SidebarWrapper startingWidth={startingWidth}>
      <div>Sidebar</div>
    </SidebarWrapper>
  );
};
