import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import RiseLoader from 'react-spinners/RiseLoader'
import { UserRole } from '../../Constants/users'
import { getSubscriptions } from '../../Redux/subscriptions/actions'
import WebSubscriptionsList from '../../Components/subscription/webSubscriptionsList'
import { SubscriptionDetailDialog } from '../../Components/subscription/detailDialog'
import MobileList from '../../Components/common/mobileList'
import axios from 'axios'
import Swal from 'sweetalert2'
import searchIcon from '../../Assets/search.svg'

function SubscriptionsList () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.profile).profile
  const totalCount = useSelector(state => state.subscriptions).totalCount
  const subscriptions = useSelector(state => state.subscriptions).subscriptions
  const authUser = useSelector(state => state.profile).profile
  const id = user._id

  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [loading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const mobileColumns = [
    { key: 'name', type: 'main' },
    { key: 'price', type: 'sub' },
    { key: 'inspections', label: 'Inspections', type: 'collapse' },
    {
      key: 'features',
      label: 'Features',
      type: 'collapse',
      render: features => (
        <div className='flex gap-2 flex-wrap'>
          {features?.map((feature, index) => (
            <div
              key={index}
              className='bg-grey2 text-white font-bold py-1 px-4 rounded-full'
            >
              {feature.name}: {feature.price}
            </div>
          ))}
        </div>
      )
    }
  ]

  const isLastPage = (page, totalPages) => page === totalPages
  const totalPages = Math.ceil(totalCount / pageSize)
  const isLast = isLastPage(page, totalPages)
  const riseLoaderCss = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-50px',
    marginLeft: '-100px'
  }

  const handleChangeSearch = e => {
    setSearch(e.target.value)
  }

  const handleFetchList = async () => {
    try {
      setIsLoading(true)
      await dispatch(getSubscriptions(page, pageSize, search))
      setIsLoading(false)
    } catch {
      setIsLoading(false)
    }
  }

  const handleOpenAddDialog = () => {
    setOpen(true)
  }

  const handleCloseAddDialog = async ({ refresh: shouldRefresh }) => {
    setOpen(false)
    if (shouldRefresh) {
      await handleFetchList()
    }
  }

  const handleGetSubscription = id => {
    return axios.get(
      `${import.meta.env.REACT_APP_BACKEND}/api/subscriptions/${id}`,
      { headers: { 'x-auth-token': `${localStorage.getItem('token')}` } }
    )
  }

  const handleDeleteSubscription = async (e, id) => {
    e.stopPropagation()
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this subscriptions!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const config = {
          method: 'delete',
          url: `${import.meta.env.REACT_APP_BACKEND}/api/subscriptions/${id}`,
          headers: {
            'x-auth-token': `${localStorage.getItem('token')}`
          }
        }

        return axios(config)
          .then(() => {
            return true
          })
          .catch(() => {
            Swal.fire({
              text: 'Failed to remove subscriptions',
              icon: 'warning',
              iconColor: '#4368B1',
              confirmButtonColor: '#4368B1',
              confirmButtonText: 'quitter'
            })
          })
      }
    }).then(async result => {
      if (result.isConfirmed) {
        await Swal.fire({
          title: 'Suprimer!',
          text: 'Subscriptions removed successfully!',
          iconColor: '#4368B1',
          icon: 'success',
          confirmButtonColor: '#4368B1',
          confirmButtonText: 'Finir'
        })
        await handleFetchList()
      }
    })
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      await handleFetchList()
    }, 700)

    return () => clearTimeout(delayDebounceFn)
    // eslint-disable-next-line
  }, [search])

  useEffect(() => {
    ;(async () => await handleFetchList())()
    // eslint-disable-next-line
  }, [id, pageSize, page])

  return (
    <>
      {open && (
        <SubscriptionDetailDialog
          selectedSubscription={null}
          open={open}
          onClose={handleCloseAddDialog}
        />
      )}

      <h3 className='font-bold text-[24px] mb-6 hidden md:block'>
        Subscriptions
      </h3>
      <div className='sm:bg-white0 sm:w-full sm:border sm:border-grey2 sm:h-full sm:rounded-lg overflow-hidden '>
        <div className=' rounded-md lg:rounded-md sm:rounded-lg   '>
          <div
            className={
              'flex md:flex lg:flex justify-between items-center space-x-6 p-6 '
            }
          >
            <div className='flex justify-start items-center '>
              <h1 className={'font-bold  text-[19px] '}>Subscriptions</h1>
              <div className='relative'>
                <input
                  className='ml-4 pl-10 bg-background border border-grey3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  type='text'
                  name='search'
                  placeholder='Search'
                  value={search || ''}
                  onChange={handleChangeSearch}
                />
                <img
                  className='absolute top-4 left-8'
                  src={searchIcon}
                  alt='search-icon'
                />
              </div>
            </div>
            {/*<div className="lg:flex md:flex xxl:flex hidden">*/}
            {/*  {(!subscriptions.length || user.role !== UserRole.SUPER_ADMIN) ? null : (*/}
            {/*    <button*/}
            {/*      className="px-10 py-[5px] text-center rounded-[8px] bg-blue1 text-white0"*/}
            {/*      onClick={handleOpenAddDialog}*/}
            {/*    >*/}
            {/*      <b>+</b>  Add*/}
            {/*    </button>*/}
            {/*  )}*/}
            {/*</div>*/}
          </div>
          <div className='flex flex-col overflow-auto'>
            <div className='sm:hidden h-[calc(100vh-200px)] sm:h-[calc(100vh-400px)] overflow-scroll'>
              {subscriptions ? (
                <MobileList
                  title='Subscriptions'
                  loading={loading}
                  data={subscriptions}
                  getSingleItem={handleGetSubscription}
                  removeItem={handleDeleteSubscription}
                  columns={mobileColumns}
                  editable={authUser.role === UserRole.SUPER_ADMIN}
                />
              ) : (
                <RiseLoader cssOverride={riseLoaderCss}></RiseLoader>
              )}
            </div>
            <div className='h-[calc(100vh-290px)] mt-2 flex-col sm:flex md:flex lg:flex xxl:flex hidden'>
              {subscriptions ? (
                <WebSubscriptionsList
                  loading={loading}
                  subscriptions={subscriptions}
                  refresh={handleFetchList}
                  onOpenAddDialog={handleOpenAddDialog}
                  removeItem={handleDeleteSubscription}
                ></WebSubscriptionsList>
              ) : (
                <RiseLoader cssOverride={riseLoaderCss}></RiseLoader>
              )}
              {/* Web View */}
            </div>
          </div>
        </div>

        <div className=' flex sm:w-full space-x-5  p-3 pr-8 bottom-0 justify-end bg-white0  '>
          <div className='shrink'>
            <select
              className={' text-grey1 text-[15px] border-none rounded'}
              value={pageSize}
              onChange={e => setPageSize(e.target.value)}
            >
              {[10, 20, 30, 40].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Element par page : {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className='shrink'>
            <span className={'text-grey1 text-[15px]'}>
              {(page - 1) * pageSize + 1}-
              {Math.min(pageSize * page, totalCount)} of {totalCount}
            </span>{' '}
          </div>

          <div className='shrink space-x-10'>
            <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
              <svg
                width='8'
                height='16'
                viewBox='0 0 10 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.535 0.514893L0.0500031 8.99989L8.535 17.4849L9.95 16.0709L2.878 8.99989L9.95 1.92889L8.535 0.514893Z'
                  fill='#2E3A59'
                />
              </svg>
            </button>
            <button onClick={() => setPage(page + 1)} disabled={isLast}>
              <svg
                width='8'
                height='16'
                viewBox='0 0 10 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1.465 17.4851L9.95 9.00011L1.465 0.515106L0.0499973 1.92911L7.122 9.00011L0.0499973 16.0711L1.465 17.4851Z'
                  fill='#2E3A59'
                />
              </svg>
            </button>
          </div>

          <br />
        </div>
      </div>
    </>
  )
}

export default SubscriptionsList
