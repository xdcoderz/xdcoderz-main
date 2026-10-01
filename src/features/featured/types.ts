export type Spotlight = {
  title: string;
  description: string;
  badge: string;
  href: string;
  buttonLabel: string;
  image: string;
  imageAlt: string;
  enabled: boolean;
  startsAt: string;
  endsAt: string;
};
export type EditorState = { error?: string; message?: string; saved?: Spotlight };

