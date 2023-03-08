import { async } from "@firebase/util"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from "../hooks/useAuth"

interface Inputs {
  email: string,
  password: string
}

function login() {
  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  return (
    <div
      className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent"
    >
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018455896075554"
          crossOrigin="anonymous"></script>
        <ins class="adsbygoogle"
          style={{"display": "block"}}
          data-ad-client="ca-pub-3018455896075554"
          data-ad-slot="4883954539"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </Head>

      <Image
        src="https://rb.gy/p2hphi"
        fill
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        alt={"Banner"}
        object-fit='cover'
        className="-z-10 !hidden opacity-60 sm:!inline"
        placeholder="empty"
        priority
      />
        
      <img
        src="https://rb.gy/ulxxee"
        width={150}
        height={150}
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-10"
        alt="logo"
      />

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              className="input"
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
            />
            {
              errors.email &&
              <p className="text-orange-500 text-[13px] p-1 font-light">
                Please enter a valid email
              </p>
            }
          </label>
          <label className="inline-block w-full">
            <input
              className="input"
              type="password"
              placeholder="Password"
            {...register('password', { required: true })}
            />
            {
              errors.password &&
              <p className="text-orange-500 text-[13px] p-1 font-light">
                Your password must contain 40 to 60 character
              </p>
            }
          </label>
        </div>

        <button
          className="w-full bg-[#e50914] rounded py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
      
        <div className="text-[gray]">
          New to Netflix?{' '}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default login