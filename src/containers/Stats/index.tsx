import React from 'react'
import StatCubes from '../../components/statsCubes'

const Stats: React.FC = () => {
  return (
    <div className='my-10 overflow-auto'>
      <p className='hidden lg:block font-bold text-[23px] '>Aperçu</p>
      <StatCubes />
      <div className='flex lg:my-6 flex-col rounded-md lg:bg-white0 p-5 lg:px-5 sm:bg-white0 sm:border sm:border-grey2 mt-8'>
        <p className='font-bold text-[19px]'>Suivi des ventes</p>
      </div>
    </div>
  )
}

export default Stats
