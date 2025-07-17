export interface DataUploaderProps {
  onData: (data: any, columns: any, fileName?: string) => void;
  onError: (error: string) => void;
  fileName?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  darkMode?: boolean;
} 