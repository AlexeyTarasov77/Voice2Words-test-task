
export type VoiceRecord = {
  id: string;
  userId: string;
  filename: string;
  text?: string
  voice: Blob;
  createdAt: Date
  updatedAt: Date
}
