'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PencilIcon, PlusCircleIcon, Trash2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { deleteCategory, getAllCategory } from './services';
import toast from 'react-hot-toast';
import { showGlobalAlert } from '@/components/Alert/Alert';
import Modal from '@/components/Modal/Modal';
import CategoryFrom from './CategoryForm';

const Category = () => {
  const queryClient = useQueryClient();
  const [showCategoryForm, setShowCategoryForm] = useState<boolean>(false);
  const [selectEditId, setSelectEditId] = useState<string>('');
  const { data: categoryData, refetch } = useQuery({
    queryKey: ['getAllCategory'],
    queryFn: () => getAllCategory(),
    staleTime: 0
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: async (response) => {
      await refetch();
      toast.success(response?.message);
      queryClient.invalidateQueries({ queryKey: ['getAllCategory'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    }
  });

  const handlerDelete = (id: string) => {
    showGlobalAlert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      () => {
        deleteMutation.mutate(id);
      }
    );
  };

  return (
    <section className="text-gray-700 body-font py-10 w-[1200px]">
      <div className="w-full px-6">
        {/* Header Section */}
        <div className="flex flex-wrap justify-between items-center pb-8 border-b border-gray-300">
          <h1 className="text-3xl font-semibold text-gray-900">
            Manage Category
          </h1>
          <button
            onClick={() => setShowCategoryForm(true)}
            className="flex items-center gap-2 text-white bg-gradient-to-r from-indigo-500 to-indigo-700 py-3 px-6 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            <PlusCircleIcon size={22} strokeWidth={2} />
            Add Category
          </button>
        </div>

        {/* Instruction Level Table */}
        <div className="mt-10 overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Level Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categoryData?.data?.category.map((ele, ind) => (
                <tr
                  className="hover:bg-gray-50 transition duration-200"
                  key={ind}
                >
                  <td className="px-6 py-4">{ind + 1}</td>
                  <td className="px-6 py-4">{ele.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 
                        ${
                          ele?.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full 
                             ${ele?.is_active ? 'bg-green-500' : 'bg-red-500'}`}
                      ></span>
                      {ele?.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          setShowCategoryForm(true);
                          setSelectEditId(ele?.id);
                        }}
                        className="flex items-center text-indigo-600 hover:text-indigo-800 transition"
                      >
                        <PencilIcon className="w-4 h-4 mr-1 cursor-pointer" />
                      </button>
                      <button
                        onClick={() => handlerDelete(ele?.id)}
                        className="flex items-center text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2Icon className="w-4 h-4 mr-1 cursor-pointer" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        height={250}
        width={800}
        isOpen={showCategoryForm}
        title={selectEditId ? 'Update Category' : 'Create Category'}
        onClose={() => {
          setShowCategoryForm(false);
          setSelectEditId('');
        }}
      >
        <CategoryFrom
          refreshFn={refetch}
          recordId={selectEditId}
          onClose={() => {
            setShowCategoryForm(false);
            setSelectEditId('');
          }}
        />
      </Modal>
    </section>
  );
};

export default Category;
