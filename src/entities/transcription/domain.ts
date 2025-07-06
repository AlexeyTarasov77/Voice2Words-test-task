
export type TranscriptionEntity = {
  id: string;
  userId: string;
  name: string;
  text: string | null
  voiceFile: VoiceFileEntity
  createdAt: Date
  updatedAt: Date
}

export type VoiceFileEntity = {
  id: string;
  url: string;
  mimeType: string;
}
