import React, { useEffect, useState } from 'react';
import { CategoryFormType } from './types/type';
import { useMutation } from '@tanstack/react-query';
import { createCategory, updateCategory } from './services';
import toast from 'react-hot-toast';

const CategoryFrom = ({
  recordId,
  refreshFn,
  onClose
}: {
  recordId: string;
  refreshFn: () => void;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<CategoryFormType>({ name: '' });

  const { mutate: createBannerService, isPending: isLoadingCreate } =
    useMutation({
      mutationFn: createCategory,
      onSuccess: (response) => {
        toast.success(response?.message);
        refreshFn();
        onClose();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      }
    });

  const { mutate: updateBannerService, isPending: isLoadingUpdate } =
    useMutation({
      mutationFn: (formData: CategoryFormType) =>
        updateCategory(recordId as string, formData),
      onSuccess: (response) => {
        toast.success(response?.message);
        refreshFn();
        onClose();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      }
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recordId.length > 1) {
      updateBannerService(formData);
    } else {
      createBannerService(formData);
    }
  };

  useEffect(() => {
    console.log(recordId);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Banner Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value
              }))
            }
            placeholder="Enter banner name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold p-3 rounded-lg hover:bg-orange-600 transition duration-300 disabled:bg-orange-300"
        >
          {isLoadingCreate ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </>
  );
};

export default CategoryFrom;
