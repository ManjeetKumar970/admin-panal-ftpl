import interceptorInstance from '@/middleware/Interceptors';

export const createBanner = async (formData) => {
  const response = await interceptorInstance.get('/banner', formData);
  return response?.data;
};

export const updateBanner = async (id: string, formData) => {
  const response = await interceptorInstance.get(`/banner/${id}`, formData);
  return response?.data;
};

export const getAllBanner = async () => {
  const response = await interceptorInstance.get('/banner?status=true');
  return response?.data;
};

export const deleteBanner = async (id: string) => {
  const response = await interceptorInstance.delete(`/banner/${id}`);
  return response?.data;
};
