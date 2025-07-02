
export type VoiceRecordEntity = {
  id: string;
  userId: string;
  filename: string;
  text: string | null
  voice: Blob;
  createdAt: Date
  updatedAt: Date
}
