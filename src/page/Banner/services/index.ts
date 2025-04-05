import interceptorInstance from '@/middleware/Interceptors';
import { BannerFormTypes } from '../types/Types';

/**
 * Sends a POST request to create a new banner.
 *
 * @param formData - An object containing banner data (e.g., title, image, status).
 * @returns The server's response data after successfully creating the banner.
 */
export const createBanner = async (formData: BannerFormTypes) => {
  const response = await interceptorInstance.post('/banner', formData);
  return response?.data;
};

/**
 * Sends a PATCH request to update an existing banner by its ID.
 *
 * @param id - The unique identifier of the banner to update.
 * @param formData - An object containing the updated banner data.
 * @returns The server's response data after successfully updating the banner.
 */
export const updateBanner = async (id: string, formData: BannerFormTypes) => {
  const response = await interceptorInstance.patch(`/banner/${id}`, formData);
  return response?.data;
};

/**
 * Retrieves all banners with `status=true`, indicating active banners.
 *
 * @returns A list of all active (visible) banners from the server.
 */
export const getAllBanner = async () => {
  const response = await interceptorInstance.get('/banner?status=true');
  return response?.data;
};

/**
 * Retrieves a single banner by its ID.
 *
 * @param id - The unique identifier of the banner to retrieve.
 * @returns The server's response data containing the banner details.
 */
export const getBannerById = async (id: string | null) => {
  const response = await interceptorInstance.get(`/banner/${id}`);
  return response?.data;
};

/**
 * Sends a DELETE request to remove a banner by its ID.
 *
 * @param id - The unique identifier of the banner to delete.
 * @returns The server's response data after the banner has been deleted.
 */
export const deleteBanner = async (id: string) => {
  const response = await interceptorInstance.delete(`/banner/${id}`);
  return response?.data;
};