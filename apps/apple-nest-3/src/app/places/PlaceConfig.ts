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
  left?: {
    place: string,
    level?: number
  },
  right?: {
    place: string,
    level?: number
  }
}