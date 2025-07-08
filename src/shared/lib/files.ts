import fs from 'node:fs/promises';
import mime from "mime-types"

import { Upload } from '@aws-sdk/lib-storage'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

interface MediaUploader {
  uploadVoiceFile: (origin: string, userId: string, file: File) => Promise<string>;
}

const isFilenameExtensionless = (filename: string) => filename.split(".").length < 2

// getFilenameWithExt appends extension to the filename if it's not exist yet by inferring it from the mime type
// and also adds timestamp to avoid collision
const getFilenameWithExt = (file: File) => {
  let filename = file.name + String(new Date().getTime())
  if (isFilenameExtensionless(filename)) {
    filename = filename + "." + mime.extension(file.type)
  }
  return filename
}

export const getFileStorage = (): MediaUploader => {
  if (process.env.NODE_ENV == "production") {
    return initS3Uploader()
  }
  return initFsUploader()
}

const initS3Uploader = (): MediaUploader => {
  const client = new S3Client({
    forcePathStyle: true,
    region: process.env.S3_REGION!,
    endpoint: process.env.S3_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  })
  return {
    async uploadVoiceFile(_, userId, file) {
      const bucket = 'voices'
      const key = userId + "/" + getFilenameWithExt(file)
      await client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: file.type,
        Body: Buffer.from(await file.arrayBuffer()),
      }))
      return `https://dvgkremdzyxrgsnqivhk.storage.supabase.co/v1/object/public/${bucket}/${key}`
    },
  }
}

const initFsUploader = (): MediaUploader => {
  return {
    async uploadVoiceFile(origin, userId, file) {
      if (!origin.endsWith("/")) {
        origin += "/"
      }
      const uploadPath = "public/voices/" + userId
      await fs.mkdir(uploadPath, { recursive: true })
      const filepath = uploadPath + "/" + getFilenameWithExt(file)
      const handle = await fs.open(filepath, "w")
      await handle.write(new Uint8Array(await file.arrayBuffer()))
      await handle.close()
      return origin + filepath.replace("public/", "")
    },
  }
}
