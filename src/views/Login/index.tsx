import React from "react"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "@features/auth/authApi"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAppDispatch } from "@app/hooks"
import { authenticate } from "@features/auth/authSlice"
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react"
import { toast } from "react-toastify"

type LoginForm = {
  username: string
  password: string
}

export default function Login() {
  // Loading navigation from react-router-dom to redirect user after login
  const navigate = useNavigate()

  // Getting RTK Query mutation hook to log in user
  const [login, { isLoading }] = useLoginMutation()

  // Using Redux to dispatch authenticate action
  const dispatch = useAppDispatch()

  // Setting up React Hook Form configuration with Yup validation
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

  // Handling form submition and logging in user if successful
  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    login({
      username: data.username,
      password: data.password,
    })
      .unwrap()
      .then((authState) => {
        authState &&
          dispatch(
            authenticate({
              token: authState.token,
              user: authState.user,
            }),
          )

        // Redirecting user to Certificates page
        navigate("/")
      })
      .catch((err) =>
        toast(err.data?.message, { type: "error", position: "bottom-right" }),
      )
  }

  return (
    <Center w="100%" h="100vh">
      <Box
        bg="#FCFCFC"
        borderWidth={1}
        borderColor="blackAlpha.300"
        borderRadius={8}
        padding={8}
        paddingTop={0}
        width={400}
      >
        <Heading
          as={"h2"}
          size={"md"}
          textAlign="center"
          margin={4}
          textTransform={"uppercase"}
        >
          Certificates
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.username}>
              <Input
                placeholder="Login"
                textAlign={"center"}
                {...register("username")}
              />
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <Input
                placeholder="Password"
                textAlign={"center"}
                type="password"
                {...register("password")}
              />
            </FormControl>
            <Button
              colorScheme="brand"
              type="submit"
              isLoading={isLoading}
              w={"full"}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  )
}
