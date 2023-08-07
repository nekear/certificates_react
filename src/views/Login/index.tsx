import React from "react"
import { Link } from "react-router-dom"
import { useLoginMutation } from "@features/auth/authApi"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAppDispatch } from "@app/hooks"
import { authenticate } from "@features/auth/authSlice"

type LoginForm = {
  username: string
  password: string
}

export default function Login() {
  const [login, { isLoading }] = useLoginMutation()

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
      }),
    ),
  })

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    login({
      username: data.username,
      password: data.password,
    })
      .unwrap()
      .then((authState) => {
        console.log(authState)

        authState &&
          dispatch(
            authenticate({
              token: authState.token,
              user: authState.user,
            }),
          )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder={"Login"} {...register("username")} />
          {errors.username?.message}
        </div>
        <div>
          <input placeholder={"Password"} {...register("password")} />
          {errors.password?.message}
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to={"/"}>Certificates</Link>
    </>
  )
}
