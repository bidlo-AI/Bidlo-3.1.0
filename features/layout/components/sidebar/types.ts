export interface SidebarState {
  sidebar_hidden: boolean;
  setSidebar: (hidden: boolean) => void;
  toggleSidebar: () => void;
  /** Ephemeral UI state: whether the overlay sidebar is expanded while hidden */
  overlay_open: boolean;
  openOverlay: () => void;
  closeOverlay: () => void;
  /** Current sidebar panel width in px (client-only; persisted elsewhere) */
  panel_width: number;
  setPanelWidth: (width: number) => void;
}
