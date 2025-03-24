import React, { useState } from 'react';

const Banner = () => {
  // State to store the groups of images and inputs
  const [inputGroups, setInputGroups] = useState([
    { name: '', image_link: '', head_description: '', sub_description: '', btn_link: '', image: null },
  ]);

  // Handle input change for each field
  const handleInputChange = (e, index, field) => {
    const newInputGroups = [...inputGroups];
    newInputGroups[index][field] = e.target.value;
    setInputGroups(newInputGroups);
  };

  // Handle image file selection
  const handleImageChange = (e, index) => {
    const newInputGroups = [...inputGroups];
    newInputGroups[index].image = URL.createObjectURL(e.target.files[0]);
    setInputGroups(newInputGroups);
  };

  // Add a new input group
  const addInputGroup = () => {
    setInputGroups([
      ...inputGroups,
      { name: '', image_link: '', head_description: '', sub_description: '', btn_link: '', image: null },
    ]);
  };

  // Remove an input group
  const removeInputGroup = (index) => {
    const newInputGroups = inputGroups.filter((_, i) => i !== index);
    setInputGroups(newInputGroups);
  };

  return (
    <div className='overflow-y-auto max-h-[500px]'>
      <h1 className="text-2xl font-semibold mb-4 text-center m-2">Upload Images</h1>
      <form className='bg-white rounded-lg font-mono py-3'>
        {inputGroups.map((group, index=0) => (
          <div key={index} className="space-y-3 border border-gray-300 m-3 flex">
            {/* Input Fields - 90% width */}
            <div className="w-9/12 space-y-3">
              {/* Name input */}
              <input
                type="text"
                className="m-2 text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Name"
                value={group.name}
                onChange={(e) => handleInputChange(e, index, 'name')}
              />
              
              {/* Image link input */}
              <input
                type="text"
                className="m-2 text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Image Link"
                value={group.image_link}
                onChange={(e) => handleInputChange(e, index, 'image_link')}
              />
              
              {/* Head description input */}
              <input
                type="text"
                className="m-2 text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Head Description"
                value={group.head_description}
                onChange={(e) => handleInputChange(e, index, 'head_description')}
              />
              
              {/* Sub description input */}
              <input
                type="text"
                className="m-2 text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Sub Description"
                value={group.sub_description}
                onChange={(e) => handleInputChange(e, index, 'sub_description')}
              />
              
              {/* Button link input */}
              <input
                type="text"
                className="m-2 text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Button Link"
                value={group.btn_link}
                onChange={(e) => handleInputChange(e, index, 'btn_link')}
              />
              
              {/* File input for image */}
              <input
                type="file"
                className="m-2 text-sm w-full border-gray-300 rounded-lg shadow-sm"
                onChange={(e) => handleImageChange(e, index)}
              />
            
            <button
              type="button"
              onClick={() => removeInputGroup(index=1)}
              className="cursor-pointer m-3 px-4 py-2 bg-red-500 text-white hover:bg-green-700 transition duration-300 rounded-lg"
              >
              Remove This Group
            </button>
            </div>
            
            {/* Image Preview - 10% width */}
            <div className="w-4/12 flex justify-center ">
              {group.image && (
                <img
                  src={group.image}
                  alt={`Uploaded ${group.name}`}
                  className="w-40 h-36 border border-gray-400 rounded-lg"
                />
              )}
            </div>
          </div>
        ))}

        {/* Add new input group button */}
        <button
          type="button"
          onClick={addInputGroup}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300"
        >
          + Add Another Image Group
        </button>

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

export default Banner;
