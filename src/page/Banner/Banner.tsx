'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusCircleIcon, Trash2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { deleteBanner, getAllBanner } from './services';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { BannerList } from './types/Types';
import { showGlobalAlert } from '@/components/Alert/Alert';
import Skeleton from '@/components/Loading/Skeleton/Skeleton';
import BannerForm from './BannerForm';
import Modal from '@/components/Modal/Modal';

export const useBanners = () => {
  return useQuery({
    queryKey: ['getAllBanner'],
    queryFn: getAllBanner
  });
};

const Banner = () => {
  const queryClient = useQueryClient();
  const [showBannerForm, setShowBannerForm] = useState<boolean>(false);
  const { data: bannerData, error, isLoading, refetch } = useBanners();

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteBanner,
    onSuccess: async () => {
      await refetch();
      toast.success('Banner deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['getAllBanner'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to delete banner');
    }
  });

  const handleDelete = (id: string) => {
    showGlobalAlert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      () => {
        deleteMutation.mutate(id);
      }
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.response?.data?.message);
    }
  }, [error]);

  return (
    <section className="text-gray-700 body-font py-10">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center pb-8 border-b border-gray-300">
          <h1 className="text-3xl font-semibold text-gray-900">
            Manage Banner
          </h1>
          <button
            onClick={() => setShowBannerForm(true)}
            className="flex items-center gap-2 text-white bg-gradient-to-r from-indigo-500 to-indigo-700 py-3 px-6 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            <PlusCircleIcon size={22} strokeWidth={2} />
            Add Banner
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton height={300} width={350} key={index} />
              ))
            : bannerData?.data?.banners?.map((item: BannerList) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
                >
                  <div className="relative h-72 w-96">
                    <Image
                      alt={item.name || 'Banner image'}
                      src={item.file_info.url}
                      className="object-cover object-center"
                      width={600}
                      height={100}
                    />
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </h2>
                    <Trash2Icon
                      onClick={() => handleDelete(item.id)}
                      className="cursor-pointer text-red-500"
                      size={18}
                      strokeWidth={2}
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>
      <Modal
        height={700}
        width={800}
        isOpen={showBannerForm}
        title={'Banner Form'}
        onClose={() => setShowBannerForm(false)}
      >
        <BannerForm
          RefreshFn={refetch}
          CloseFn={() => setShowBannerForm(false)}
        />
      </Modal>
    </section>
  );
};

export default Banner;
