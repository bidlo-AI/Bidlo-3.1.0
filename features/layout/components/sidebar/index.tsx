import { ResizablePanel } from '../resizable-panel';
const STORAGE_KEY = 'sidebarWidthPx';

export const Sidebar = () => {
  return (
    <ResizablePanel
      side="right"
      storageKey={STORAGE_KEY}
      defaultWidth={200}
      minWidth={50}
      maxWidth={400}
      className="bg-muted"
    >
      <div>Sidebar</div>
    </ResizablePanel>
  );
};
