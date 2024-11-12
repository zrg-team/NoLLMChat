import { fs } from 'src/services/file-system'

export const useStoreBlob = () => {
  const storeBlob = async ({
    mimeType,
    taskId,
    blob,
  }: {
    mimeType: string
    taskId: string
    blob?: Blob
  }) => {
    if (!blob || !taskId) {
      return
    }
    const baseFilePath = `/messages/${taskId}`
    await fs.mkdir(baseFilePath)
    const fileName = `${Date.now()}.${mimeType.split('/')[1]}`
    await fs.writeFile(`${baseFilePath}/${fileName}`, blob)
    return {
      fileName,
      path: `${baseFilePath}/${fileName}`,
    }
  }

  return {
    storeBlob,
  }
}
