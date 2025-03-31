'use client';
import React from 'react';
import { Image, Grid, LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Card = ({
  title,
  Icon,
  clickFn
}: {
  title: string;
  Icon: LucideIcon;
  clickFn: () => void;
}) => {
  return (
    <div
      className="w-72 bg-white shadow-lg p-8 space-y-4 relative overflow-hidden 
                 transition-all transform hover:scale-105 hover:shadow-2xl 
                 hover:bg-gradient-to-br from-violet-100 to-violet-200 duration-300 
                 cursor-pointer rounded-2xl flex flex-col items-center justify-center"
      role="button"
      aria-label={title}
      onClick={clickFn}
    >
      <div className="w-16 h-16 flex items-center justify-center bg-violet-500 text-white rounded-full shadow-md">
        <Icon size={28} />
      </div>
      <h1 className="font-semibold text-lg text-gray-800 text-center">
        {title}
      </h1>
    </div>
  );
};

const Interface = () => {
  const router = useRouter();
  const cardData = [
    { id: 1, title: 'Banner', icon: Image, link: 'interface/banner' },
    { id: 2, title: 'Category', icon: Grid, link: 'interface/banner' }
  ];

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-6 py-10 mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {cardData.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              Icon={card.icon}
              clickFn={() => router.push(card.link)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interface;
