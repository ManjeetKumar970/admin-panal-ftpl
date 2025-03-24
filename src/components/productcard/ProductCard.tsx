import React from 'react';

const ProductCard = () => {
 ;

  return (
    <div className='overflow-y-auto max-h-[500px]'>
    <h1 className="text-2xl font-semibold mb-4 text-center m-2">Add Products</h1>
    <form className='bg-white rounded-lg font-mono py-3'>
      
        <div  className="space-y-3 border border-gray-300 m-3 flex">
          {/* Input Fields - 90% width */}
          <div className="w-9/12 space-y-3">
            {/* Name input */}
            <input
              type="text"
              className="m-2 text-sm custom-input w-6/12 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="title"
            
            />
             
            {/* Head description input */}
            <input
              type="number"
              className="m-2 text-sm custom-input w-6/12 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Price"
             
            />
            
            {/* Sub description input */}
            <input
              type="number"
              className="m-2 text-sm custom-input w-6/12 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Original Price"
             
            />
            {/* Button link input */}
            <input
              type="file"
              className="m-2 text-sm custom-input w-6/12 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="products"
             />
            <textarea
                className="m-2 text-sm custom-input w-6/12 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="description"></textarea>
             
            
          </div>
          
        </div>

      {/* Submit button */}
      <div className="mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  );
};

export default ProductCard;
