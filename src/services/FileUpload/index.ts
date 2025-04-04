// Importing the Axios instance with interceptors for handling requests
import interceptorInstance from '@/middleware/Interceptors';

/**
 * Uploads a single file (e.g., image or document) to the server.
 *
 * @param file - The file to be uploaded (must be a valid File object).
 * @returns The response data from the server after uploading the file.
 */
export const singleFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('files', file);

  const response = await interceptorInstance.post('/file-upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response?.data;
};
