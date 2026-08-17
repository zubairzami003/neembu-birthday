export type StoryScene =
  | 'knock'
  | 'door_open'
  | 'hug_celebration'
  | 'notebook_letter'
  | 'sleeping';

export interface LetterData {
  recipientName: string;
  senderName: string;
  date: string;
  message: string;
}

export interface SoundSettings {
  isMuted: boolean;
  volume: number;
}
