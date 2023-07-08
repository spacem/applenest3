export interface PlaceConfig {
  title: string;
  image: string;
  initialText: string;
  actions: {
    title: string;
    action: string;
    param?: string;
    icon?: string;
    level?: number;
  }[]
}