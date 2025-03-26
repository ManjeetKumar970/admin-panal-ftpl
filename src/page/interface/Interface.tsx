import React from 'react';

const Interface = () => {
  // Example dynamic data (can be fetched from an API or database)
  const cardData = [
    {
      id: 1,
      title: 'UI / UX Creative Design',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse fuga adipisicing elit.',
      icon: '02',
    },
    {
      id: 2,
      title: 'Web Development',
      description: 'Dolor sit amet consectetur adipisicing elit. Ex optio distinctio.',
      icon: '03',
    },
    {
      id: 3,
      title: 'Mobile App Design',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed veniam.',
      icon: '04',
    },
    {
      id: 4,
      title: 'Digital Marketing',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse fuga.',
      icon: '05',
    },
    {
        id: 5,
        title: 'Digital Marketing',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse fuga.',
        icon: '05',
      },
      {
        id: 5,
        title: 'Digital Marketing',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse fuga.',
        icon: '05',
      },
      {
        id: 6,
        title: 'Digital Marketing',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse fuga.',
        icon: '05',
      },
    // Add more objects for additional cards
  ];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-violet-100 duration-300 m-5"
            >
              <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
                <p className="absolute bottom-6 left-7 text-white text-2xl">{card.icon}</p>
              </div>
              <div className="fill-violet-500 w-12">
                 {/* there we can add logo of icon */}
              </div>
              <h1 className="font-bold text-xl">{card.title}</h1>
              <p className="text-sm text-zinc-500 leading-6">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interface;
