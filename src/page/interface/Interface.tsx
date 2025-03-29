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
      className="w-64 bg-white shadow-md p-9 space-y-3 relative overflow-hidden 
                 transition-transform transform hover:scale-105 hover:shadow-xl 
                 hover:bg-violet-100 duration-300 m-5 cursor-pointer rounded-xl"
      role="button"
      aria-label={title}
      onClick={clickFn}
    >
      <div className="w-12 h-12 flex items-center justify-center bg-violet-500 text-white rounded-full">
        <Icon size={24} />
      </div>
      <h1 className="font-bold text-xl">{title}</h1>
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
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap justify-center">
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
    </>
  );
};

export default Interface;
