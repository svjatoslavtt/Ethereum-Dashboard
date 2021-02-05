import React from 'react';

type SectionTypes = {
 title: string;
 icon?: boolean;
};

const Section: React.FC<SectionTypes> = ({ children, title, icon }) => {
 return (
  <section className='mb-10'>
   <div className='flex justify-between items-center w-full mb-5'>
    <span className='text-xl uppercase block'>{title}</span>
    {icon && (
     <i className='fas fa-cog bg-gray-300 px-4 py-2 text-xs text-gray-500 cursor-pointer' />
    )}
   </div>

   {children}
  </section>
 );
};

export default Section;
