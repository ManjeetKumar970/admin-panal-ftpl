import interceptorInstance from '@/middleware/Interceptors';
import { loginTypes } from '@/page/login/types/types';

/**
 * Authenticates a user by sending login credentials to the API.
 *
 * @param {loginTypes} formData - An object containing the user's login details, including email and password.
 * @returns {Promise<unknown>} - A promise that resolves with the API response data upon successful authentication.
 * @throws {Error} - Throws an error if the API request fails or returns an unsuccessful response.
 */
export const loginService = async (formData: loginTypes) => {
  const response = await interceptorInstance.post(
    '/auth/admin/login',
    formData
  );
  return response?.data;
};
