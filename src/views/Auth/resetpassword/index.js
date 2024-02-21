import { useState, useEffect } from 'react'
import showPass from '../../../Assets/Auth/showpass.svg'
import hidePass from '../../../Assets/Auth/hidepass.svg'
import logo from '../../../Assets/Auth/logo.png'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useRef } from 'react'
const ResetPassword = () => {
  const { token } = useParams()
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [loadScreen, setLoadScreen] = useState('')

  const [collapseShowSucces, setCollapseShowSucces] = useState('hidden')
  const [collapseShowError, setCollapseShowError] = useState('hidden')
  const refsucces = useRef()
  const referror = useRef()
  const [loading, setLoading] = useState(false)

  const verifytoken = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.REACT_APP_BACKEND}/api/auth/verify-account/${token}`
      )

      setEmail(res.data.email)
      res.data.modifiedCount === 1 && setLoadScreen('valid signature')
      res.data.modifiedCount !== 1 && setLoadScreen('invalid signature')
    } catch (error) {
      // to enhance
    }
  }
  useEffect(() => {
    verifytoken()
    const listener = e => {
      if (!refsucces.current.contains(e.target)) {
        setCollapseShowSucces('hidden')
      }
      if (!referror.current.contains(e.target)) {
        setCollapseShowError('hidden')
      }
    }

    document.addEventListener('click', listener)
    document.addEventListener('focusin', listener)
    return () => {
      document.removeEventListener('click', listener)
      document.removeEventListener('focusin', listener)
    }
    // eslint-disable-next-line
  }, [])

  const resetPassword = async user => {
    setLoading(true)
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify(user)

    try {
      const res = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND}/api/auth/resetpassword`,
        body,
        config
      )

      if (res.data.succes) {
        setLoading(false)
        setCollapseShowSucces('bg-black')
        document.getElementById('succesmsg').innerHTML =
          'Votre mot de passe a été modifié avec avec succès! , redirection...'
        setTimeout(() => {
          window.location.replace('/')
        }, 3000)
      } else {
        setLoading(false)
        setCollapseShowError('bg-black')
        document.getElementById('errormsg').innerHTML = res.data.error
      }
    } catch (error) {
      // to enhance
    }
  }

  const reset = e => {
    e.preventDefault()
    if (password === confirmpassword && password !== '') {
      const payload = { password, email, token }
      resetPassword(payload)
    } else if (password === '') {
      setCollapseShowError('bg-black')
      document.getElementById('errormsg').innerHTML = 'Password Cannot be empty'
    } else {
      setCollapseShowError('bg-black')
      document.getElementById('errormsg').innerHTML = 'Not Identical'
    }

    setpassword('')
    setconfirmpassword('')
  }

  const onChangePassword = e => {
    const value = e.target.value
    setpassword(value)
  }

  const onChangeConfirmPassword = e => {
    const value = e.target.value

    setconfirmpassword(value)
  }

  const [passwordShown, setPasswordShown] = useState(true)
  const [confirmpasswordShown, setconfirmPasswordShown] = useState(true)
  const showPassword = () => {
    setPasswordShown(!passwordShown)
  }

  const showconfirmPassword = () => {
    setconfirmPasswordShown(!confirmpasswordShown)
  }
  return (
    <div>
      {loadScreen === 'valid signature' ? (
        <div className=' w-screen h-screen flex items-center justify-center'>
          <form
            className='font-mulish tablet:box-border tablet:w-96 tablet:h-55 tablet:border-2 tablet:p-10 tablet:rounded-lg tablet:border-grey3'
            onSubmit={reset}
          >
            <div className=' space-y-10'>
              <div className=' flex flex-col justify-center items-center '>
                <div className='m-5'>
                  <img className='w-25 h-16 my-5' src={logo} alt='logo' />
                </div>
                <div className='space-y-12'>
                  <div>
                    <p className='font-bold text-[24px] justyify-center'>
                      Introduire Mot de Passe
                    </p>
                  </div>
                </div>
              </div>
              {loading && (
                <div className='flex flex-col justify-center items-center '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 200 200'
                    fill='none'
                    color='#282F75'
                  >
                    <defs>
                      <linearGradient id='spinner-secondHalf'>
                        <stop
                          offset='0%'
                          stop-opacity='0'
                          stop-color='currentColor'
                        />
                        <stop
                          offset='100%'
                          stop-opacity='0.5'
                          stop-color='currentColor'
                        />
                      </linearGradient>
                      <linearGradient id='spinner-firstHalf'>
                        <stop
                          offset='0%'
                          stop-opacity='1'
                          stop-color='currentColor'
                        />
                        <stop
                          offset='100%'
                          stop-opacity='0.5'
                          stop-color='currentColor'
                        />
                      </linearGradient>
                    </defs>
                    <g stroke-width='8'>
                      <path
                        stroke='url(#spinner-secondHalf)'
                        d='M 4 100 A 96 96 0 0 1 196 100'
                      />
                      <path
                        stroke='url(#spinner-firstHalf)'
                        d='M 196 100 A 96 96 0 0 1 4 100'
                      />

                      <path
                        stroke='currentColor'
                        stroke-linecap='round'
                        d='M 4 100 A 96 96 0 0 1 4 98'
                      />
                    </g>
                    <animateTransform
                      from='0 0 0'
                      to='360 0 0'
                      attributeName='transform'
                      type='rotate'
                      repeatCount='indefinite'
                      dur='1300ms'
                    />
                  </svg>
                </div>
              )}

              <div
                className={
                  '   h-[3rem] border-2 border-[#2D9C2B] bg-[#EDFFEC]  text-sm rounded-2xl   block w-full p-2.5  ' +
                  collapseShowSucces
                }
                ref={refsucces}
              >
                <div className='flex justify-arround items-center'>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10 20C4.47967 19.994 0.00606237 15.5204 0 10V9.80002C0.109931 4.30455 4.63459 -0.0720257 10.1307 0.000898217C15.6268 0.0738221 20.0337 4.5689 19.9978 10.0654C19.9619 15.5618 15.4966 19.9989 10 20ZM5.41 9.59002L4 11L8 15L16 7.00002L14.59 5.58002L8 12.17L5.41 9.59002Z'
                      fill='#2D9C2B'
                    />
                  </svg>

                  <p
                    className='font-normal text-[13px] px-5'
                    id='succesmsg'
                  ></p>
                </div>
              </div>
              <div
                className={
                  '  h-[3rem] border-2 border-[#D20000] bg-[#FFF5F5] border-2 text-sm rounded-2xl   block w-full p-2.5  ' +
                  collapseShowError
                }
                ref={referror}
              >
                <div className='flex justify-arround items-center'>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C19.9939 15.5203 15.5203 19.9939 10 20ZM9 13V15H11V13H9ZM9 5V11H11V5H9Z'
                      fill='#D20000'
                    />
                  </svg>
                  <p
                    className='font-normal text-[13px] px-5 '
                    id='errormsg'
                  ></p>
                </div>
              </div>

              <div className=' flex-col space-y-5 grid place-items-center  '>
                <div>
                  <div className='mb-5'>
                    <label
                      for='first_name'
                      className=' block mb-2 text-sm font-medium text-grey1 dark:text-gray-300'
                    >
                      Adresse E-mail
                    </label>
                    <input
                      type='Email'
                      name='email'
                      defaultValue={email}
                      className=' w-80 bg-background border border-grey3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      disabled
                    />
                  </div>
                  <div className='mb-5'>
                    <label
                      for='password'
                      className=' block mb-2 text-sm font-medium text-grey1 dark:text-gray-300'
                    >
                      Mot de Passe
                    </label>
                    <div className='flex relative flex-row items-center box-border h-10 w-80 border-2 rounded-lg border-grey3 '>
                      <img
                        className='absolute inset-y-0 right-0 px-2 py-2'
                        src={passwordShown ? hidePass : showPass}
                        onClick={showPassword}
                        alt='show password'
                      />
                      <input
                        type={passwordShown ? 'password' : 'text'}
                        name='password'
                        placeholder='Password'
                        value={password}
                        onChange={onChangePassword}
                        className=' w-80 bg-background border border-grey3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      />
                    </div>
                  </div>

                  <label
                    for='password'
                    className=' block mb-2 text-sm font-medium text-grey1 dark:text-gray-300'
                  >
                    Confirmer Mot de Passe
                  </label>
                  <div className='flex relative flex-row items-center box-border h-10 w-80 border-2 rounded-lg border-grey3 '>
                    <img
                      className='absolute inset-y-0 right-0 px-2 py-2'
                      src={confirmpasswordShown ? hidePass : showPass}
                      onClick={showconfirmPassword}
                      alt='show password'
                    />
                    <input
                      type={confirmpasswordShown ? 'password' : 'text'}
                      name='confirmpassword'
                      placeholder='Confirm Password'
                      value={confirmpassword}
                      onChange={onChangeConfirmPassword}
                      className=' w-80 bg-background border border-grey3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                  </div>
                  <div className='mt-5'>
                    <button
                      className='box-border h-10 w-80  border-1 rounded-lg text-white0 bg-blue1 '
                      type='submit'
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : loadScreen === 'invalid signature' ? (
        <div className=' w-screen h-screen flex items-center justify-center'>
          <form className='font-mulish tablet:box-border tablet:w-96 tablet:h-55 tablet:border-2 tablet:p-10 tablet:rounded-lg tablet:border-grey3'>
            <div className=' space-y-10'>
              <div className=' flex flex-col justify-center items-center '>
                <div className='m-5'>
                  <img className='w-25 h-16 ' src={logo} alt='logo' />
                </div>
                <div className='space-y-12'>
                  <div>
                    <div className=' flex-col space-y-5 grid place-items-center  '>
                      <p className='font-bold text-[24px] justyify-center'>
                        Link used or expired
                      </p>

                      <div className='mt-5'>
                        <a
                          className='box-border px-5  py-2 border-1 rounded-lg text-white0 bg-blue1 '
                          href='/'
                        >
                          Go Back
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  )
}

export default ResetPassword
