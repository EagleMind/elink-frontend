import { useState, useEffect } from 'react'
import { Spinner } from '../../../Components/car/common/subComponents/spinner'
import logo from '../../../Assets/Auth/logo.png'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
const VerifyAccount = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [loadScreen, setLoadScreen] = useState(true)
  const [errorMsg, setErrorMsg] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const verifytoken = async token => {
    try {
      const res = await axios.get(
        `${import.meta.env.REACT_APP_BACKEND}/api/auth/verify-account/${token}`
      )
      if (res.data.modifiedCount === 1) {
        setSuccessMsg(true)
        setLoadScreen(false)
        setTimeout(() => {
          navigate('/', {
            state: { verificationSuccess: res.data.modifiedCount }
          })
        }, 3000)
      } else {
        setLoadScreen(false)
        setErrorMsg(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    verifytoken(token)
    // eslint-disable-next-line
  }, [])
  if (loadScreen) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <div>
        {successMsg && (
          <div className=' w-screen h-screen flex items-center justify-center'>
            <div className='font-mulish tablet:box-border tablet:w-96 tablet:h-55 tablet:border-2 tablet:p-10 tablet:rounded-lg tablet:border-grey3'>
              <div className=' space-y-10'>
                <div className=' flex flex-col justify-center items-center '>
                  <div className='m-5'>
                    <img className='w-25 h-16 ' src={logo} alt='logo' />
                  </div>
                  <div className='space-y-12'>
                    <div>
                      <div className='flex flex-col gap-4 justify-center items-center'>
                        <Spinner color={'#4368B1'}></Spinner>
                        <p className='font-bold text-[24px]'>
                          Activation du compte en cours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {errorMsg && (
          <div className=' w-screen h-screen flex items-center justify-center'>
            <div className='font-mulish tablet:box-border tablet:w-96 tablet:h-55 tablet:border-2 tablet:p-10 tablet:rounded-lg tablet:border-grey3'>
              <div className=' space-y-10'>
                <div className=' flex flex-col justify-center items-center '>
                  <div className='m-5'>
                    <img className='w-25 h-16 ' src={logo} alt='logo' />
                  </div>
                  <div className='space-y-12'>
                    <div>
                      <div className=' flex-col space-y-5 grid place-items-center  '>
                        <p className='font-bold text-[24px] justyify-center'>
                          Lien expiré ou activation non valable
                        </p>

                        <div className='mt-5'>
                          <a
                            className='box-border px-5  py-2 border-1 rounded-lg text-white0 bg-blue1 '
                            href='/'
                          >
                            Retour
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyAccount
