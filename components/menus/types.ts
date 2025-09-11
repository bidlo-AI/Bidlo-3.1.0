export interface BaseMenu {
  query: string;
  page_stack: string[];
  page: () => string;
  go_back: () => void;
  go_to: (route: string) => void;
}
