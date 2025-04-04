import React, { useState } from 'react';
import { BannerFormTypes } from './types/Types';
import { useMutation } from '@tanstack/react-query';
import { singleFileUpload } from '@/services/FileUpload';
import { createBanner } from './services';
import toast from 'react-hot-toast';

const BannerForm = ({
  CloseFn,
  RefreshFn
}: {
  CloseFn: () => void;
  RefreshFn: () => void;
}) => {
  const [formData, setFormData] = useState<BannerFormTypes>({
    name: '',
    file_id: '',
    head_description: '',
    sub_description: '',
    btn_link: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: bannerCreateServices, isPending: isBannerLoading } =
    useMutation({
      mutationFn: createBanner,
      onSuccess: (response) => {
        CloseFn();
        RefreshFn();
        toast.success(response?.message);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      }
    });

  const { mutate: uploadSingleFile, isPending: isFileUploadLoading } =
    useMutation({
      mutationFn: singleFileUpload,
      onSuccess: async (response) => {
        formData.file_id = response?.data?.uploaded_file[0]?.public_id;
        debugger;
        await bannerCreateServices(formData);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      }
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate getting file_id (e.g. after upload)
      setFormData({ ...formData, file_id: file.name });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    uploadSingleFile(selectedFile);
    console.log(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Banner Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
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

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Head Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="head_description"
            id="head_description"
            value={formData.head_description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value
              }))
            }
            placeholder="Enter head description"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Sub Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="sub_description"
            id="sub_description"
            value={formData.sub_description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value
              }))
            }
            placeholder="Enter sub description"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Button Link <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="btn_link"
            id="btn_link"
            value={formData.btn_link}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value
              }))
            }
            placeholder="Enter button link"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Upload File <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full cursor-pointer p-2 border rounded-lg  file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            required
          />
        </div>

        <button
          disabled={isBannerLoading || isFileUploadLoading}
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold p-3 rounded-lg hover:bg-orange-500 transition duration-300 disabled:bg-orange-700"
        >
          {isBannerLoading || isFileUploadLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </>
  );
};

export default BannerForm;
