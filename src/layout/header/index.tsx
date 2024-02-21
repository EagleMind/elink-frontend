import React from 'react'
import { useSelector } from 'react-redux'
import defaultAvatar from '../../Assets/default-avatar.png'

interface ProfileState {
  profile: {
    firstName: string,
    lastName: string,
    image: string
  };
}

const Navbar: React.FC = () => {
  const state = useSelector((state: ProfileState) => state.profile)

  return (
    <>
      <nav className=' left-0 w-full bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center bg-white0  '>
        <div className='w-full items-center flex justify-between md:flex-nowrap flex-wrap md:px-5 '>
          <div></div>
          <ul className='flex-col md:flex-row list-none items-center hidden md:flex'>
            <a className='text-blueGray-500 block'>
              <div className='items-center flex'>
                <span className='w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12 22C10.896 21.9946 10.0009 21.1039 9.99 20H13.99C13.9921 20.2674 13.9411 20.5325 13.84 20.78C13.5777 21.382 13.0418 21.8211 12.4 21.96H12.395H12.38H12.362H12.353C12.2368 21.9842 12.1186 21.9976 12 22ZM20 19H4V17L6 16V10.5C5.94732 9.08912 6.26594 7.68913 6.924 6.44C7.57904 5.28151 8.6987 4.45888 10 4.18V2H14V4.18C16.579 4.794 18 7.038 18 10.5V16L20 17V19Z'
                      fill='#2E3A59'
                    />
                  </svg>
                </span>
              </div>
            </a>
            <div className='first-letter:relative  group '>
              <div className=' items-center flex bg-white0 p-5'>
                <p className='px-5'>{state.firstName + ' ' + state.lastName}</p>
                <div className='w-12 h-12  inline-flex items-center justify-center '>
                  {!state.image ? (
                    <img
                      src={defaultAvatar}
                      alt=''
                      className='  rounded'
                      style={{ width: '150px' }}
                    />
                  ) : (
                    <img
                      src={state.image}
                      alt=''
                      className='  rounded-full  '
                      style={{ width: '150px' }}
                    />
                  )}
                </div>
              </div>
              <div className='absolute z-10 items-center mx-5 invisible group-hover:visible w-60 bg-grey3 hover:bg-grey2'>
                <div className=' p-5'>
                  <a href='/' className='nav-link '>
                    Déconnexion
                  </a>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
