import React, { useEffect, useState } from 'react';
import { BannerFormTypes } from './types/Types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { singleFileUpload } from '@/services/FileUpload';
import { createBanner, getBannerById, updateBanner } from './services';
import toast from 'react-hot-toast';
import Image from 'next/image';

const BannerForm = ({
  closeFn,
  refreshFn,
  recordId
}: {
  closeFn: () => void;
  refreshFn: () => void;
  recordId: string | null;
}) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<BannerFormTypes>({
    name: '',
    file_id: '',
    head_description: '',
    sub_description: '',
    btn_link: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: bannerData } = useQuery({
    queryKey: ['getBannerById', recordId],
    queryFn: () => getBannerById(recordId),
    enabled: !!recordId,
    staleTime: 0
  });

  const { mutate: bannerCreateServices, isPending: isBannerLoading } =
    useMutation({
      mutationFn: createBanner,
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ['getBannerById', recordId]
        });
        closeFn();
        refreshFn();
        toast.success(response?.message);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      }
    });

  const { mutate: bannerUpdateServices, isPending: isUpdateBannerLoading } =
    useMutation({
      mutationFn: (formData: BannerFormTypes) =>
        updateBanner(recordId as string, formData),
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ['getBannerById', recordId]
        });
        closeFn();
        refreshFn();
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
        if (!recordId) {
          await bannerCreateServices(formData);
        } else {
          await bannerUpdateServices(formData);
        }
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      }
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recordId) {
      uploadSingleFile(selectedFile);
    } else {
      debugger;
      if (selectedFile) {
        uploadSingleFile(selectedFile);
      } else {
        formData.file_id = bannerData?.data?.file_info?.file_id;
        bannerUpdateServices(formData);
      }
    }
  };

  useEffect(() => {
    if (bannerData?.data) {
      setFormData({
        name: bannerData.data.name,
        file_id: '',
        head_description: bannerData.data.head_description,
        sub_description: bannerData.data.sub_description,
        btn_link: bannerData.data.btn_link
      });

      setPreviewUrl(bannerData.data.file_info?.file_url || null);
    }
  }, [bannerData]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Banner Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Banner Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
          placeholder="Enter banner name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
      </div>

      {/* Head Description */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Head Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="head_description"
          value={formData.head_description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
          rows={3}
          placeholder="Enter head description"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
      </div>

      {/* Sub Description */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Sub Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="sub_description"
          value={formData.sub_description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
          rows={3}
          placeholder="Enter sub description"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
      </div>

      {/* Button Link */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Button Link <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          id="btn_link"
          value={formData.btn_link}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
          placeholder="Enter button link"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
      </div>

      {/* Image Preview (both new upload and existing) */}
      {previewUrl && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-2">
            Image Preview:
          </p>
          <div className="border rounded-md overflow-hidden w-full max-w-lg">
            <Image
              alt="Preview Image"
              src={previewUrl}
              width={800}
              height={300}
              className="object-cover w-full h-auto rounded-md"
            />
          </div>
        </div>
      )}

      {/* File Input */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Upload Image <span className="text-red-500">*</span>
        </label>

        {/* Hidden native input */}
        <input
          type="file"
          id="fileUpload"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          required={!recordId}
        />

        {/* Custom label as button */}
        <label
          htmlFor="fileUpload"
          className="inline-block cursor-pointer px-4 py-2 border border-orange-300 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 text-sm font-semibold"
        >
          {selectedFile?.name ||
            bannerData?.data?.file_info?.file_name ||
            'Choose an image'}
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={
          isBannerLoading || isUpdateBannerLoading || isFileUploadLoading
        }
        className="w-full bg-orange-500 text-white font-semibold p-3 rounded-lg hover:bg-orange-600 transition duration-300 disabled:bg-orange-300"
      >
        {isBannerLoading || isFileUploadLoading ? 'Uploading...' : 'Submit'}
      </button>
    </form>
  );
};

export default BannerForm;
