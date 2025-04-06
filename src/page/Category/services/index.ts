import interceptorInstance from '@/middleware/Interceptors';
import { CategoryFormType } from '../types/type';

export const getAllCategory = async () => {
  const response = await interceptorInstance.get('/product-category');
  return response?.data;
};

export const deleteCategory = async (category_id: string) => {
  const response = await interceptorInstance.delete(
    `/product-category/${category_id}`
  );
  return response?.data;
};

export const createCategory = async (formData: CategoryFormType) => {
  const response = await interceptorInstance.post(
    `/product-category/`,
    formData
  );
  return response?.data;
};

export const updateCategory = async (
  id: string,
  formData: CategoryFormType
) => {
  debugger;
  const response = await interceptorInstance.patch(
    `/product-category/${id}`,
    formData
  );
  return response?.data;
};
