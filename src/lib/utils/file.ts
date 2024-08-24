import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '$lib/auth/firebase';

export async function uploadFileToStorage(file: File, folder: string = 'images'): Promise<string> {
  const fileName = getUniqueFileName(file.name);
  const fileRef = ref(storage, `${folder}/${fileName}`);
  await uploadBytes(fileRef, file);
  return fileName;
}

const getUniqueFileName = (fileName: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2);
  const extension = fileName.split('.').pop();
  const name = fileName.split('.')[0] ?? 'file';
  return `${name}-${timestamp}-${randomString}.${extension}`;
};

export const getFileStorageUrl = async (fileName: string, folder: string = 'images'): Promise<string> => {
  const fileRef = ref(storage, `${folder}/${fileName}`);
  return await getDownloadURL(fileRef);
};
