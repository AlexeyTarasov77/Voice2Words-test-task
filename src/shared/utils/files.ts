import fs from 'node:fs/promises';
import mime from "mime-types"

export const isFilenameExtensionless = (filename: string) => filename.split(".").length < 2

export const uploadFile = async (origin: string, userId: string, file: File): Promise<string> => {
  if (!origin.endsWith("/")) {
    origin += "/"
  }
  let filename = file.name
  if (isFilenameExtensionless(filename)) {
    filename = filename + "." + mime.extension(file.type)
  }
  const uploadPath = "public/voices/" + userId
  await fs.mkdir(uploadPath, { recursive: true })
  const filepath = uploadPath + "/" + filename
  const handle = await fs.open(filepath, "w")
  await handle.write(new Uint8Array(await file.arrayBuffer()))
  await handle.close()
  return origin + filepath.replace("public/", "")
}
