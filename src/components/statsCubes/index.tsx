import React, { Fragment } from 'react';
import axios from 'axios';

interface Cube {
  name: string;
  value: number;
}

const StatCubes: React.FC = () => {
  const cubes: Cube[] = [
    { name: 'Factures', value: 0 },
    { name: 'Lien de paiments', value: 0 },
    { name: 'Cliques', value: 0 },
    { name: 'Total conversion rate', value: 0 },
  ];

  return (
    <Fragment>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full md:py-3 p-10'>
        {cubes.map((cube, key) => (
          <div
            key={key}
            className='rounded-md flex-grow flex items-center justify-center bg-white0 shadow-md lg:h-[150px] xxl:h-[150px] h-[150px]'
          >
            <div className='flex flex-col items-center'>
              <h2 className='text-[13px] md:text-[16px] lg:text-[19px] font-bold text-center'>
                {cube.name}
              </h2>
              <h1 className='text-[13px] md:text-[30px] lg:text-[40px] font-bold'>
                {cube.value}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default StatCubes;
