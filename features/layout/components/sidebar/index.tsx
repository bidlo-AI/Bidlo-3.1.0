import { ResizablePanel } from '../resizable-panel';
const STORAGE_KEY = 'sidebarWidthPx';

export const Sidebar = () => {
  return (
    <ResizablePanel
      side="right"
      minWidth={50}
      maxWidth={400}
      defaultWidth={200}
      className="bg-muted"
      storageKey={STORAGE_KEY}
    >
      <div>Sidebar</div>
    </ResizablePanel>
  );
};
