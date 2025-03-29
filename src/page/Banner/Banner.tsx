import { PlusCircleIcon, Trash2Icon } from 'lucide-react';
import React from 'react';

const Banner = () => {
  return (
    <section className="text-gray-700 body-font py-10">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center pb-8 border-b border-gray-300">
          <h1 className="text-3xl font-semibold text-gray-900">
            Manage Banner
          </h1>
          <button
            className="flex items-center gap-2 text-white bg-gradient-to-r from-indigo-500 to-indigo-700 
                       py-3 px-6 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition 
                       duration-300 transform hover:scale-105"
          >
            <PlusCircleIcon size={22} strokeWidth={2} />
            Add Banner
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                alt="content"
                className="object-cover object-center h-64 w-full"
                src={`https://dummyimage.com/120${item}x50${item}`}
              />
              <div className="p-6 flex justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Banner {item}
                </h2>
                <Trash2Icon
                  className="cursor-pointer text-red-500"
                  size={18}
                  strokeWidth={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
