import interceptorInstance from '@/middleware/Interceptors';
import { BannerFormTypes } from '../types/Types';

/**
 * Creates a new banner.
 * @param formData - The data required to create a banner (title, image, etc.).
 * @returns The response data from the server after banner creation.
 */
export const createBanner = async (formData: BannerFormTypes) => {
  const response = await interceptorInstance.post('/banner', formData);
  return response?.data;
};

/**
 * Updates an existing banner by ID.
 * @param id - The unique identifier of the banner to update.
 * @param formData - The updated data for the banner.
 * @returns The response data from the server after banner update.
 */
export const updateBanner = async (id: string, formData: BannerFormTypes) => {
  const response = await interceptorInstance.patch(`/banner/${id}`, formData);
  return response?.data;
};

/**
 * Retrieves all banners with status=true.
 * Typically used to fetch banners that are active/visible.
 * @returns A list of active banners from the server.
 */
export const getAllBanner = async () => {
  const response = await interceptorInstance.get('/banner?status=true');
  return response?.data;
};

/**
 * Retrieves all banners with status=true.
 * Typically used to fetch banners that are active/visible.
 * @returns A list of active banners from the server.
 */
export const getBannerById = async (id: string | null) => {
  const response = await interceptorInstance.get(`/banner/${id}`);
  return response?.data;
};

/**
 * Deletes a banner by its ID.
 * @param id - The unique identifier of the banner to delete.
 * @returns The response data from the server after deletion.
 */
export const deleteBanner = async (id: string) => {
  const response = await interceptorInstance.delete(`/banner/${id}`);
  return response?.data;
};
