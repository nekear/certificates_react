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
  Circle,
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
        padding={8}
        paddingTop={0}
        width={400}
      >
        <Center marginBottom={50} marginTop={-100}>
          <Circle size="200px" bg="#c4c4c4">
            <Heading as="h1" color="#FCFCFC">
              Logo
            </Heading>
          </Circle>
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.username}>
              <Input
                placeholder="Login"
                fontSize={"2xl"}
                textAlign={"center"}
                {...register("username")}
              />
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <Input
                placeholder="Password"
                fontSize={"2xl"}
                textAlign={"center"}
                type="password"
                {...register("password")}
              />
            </FormControl>
            <Button
              colorScheme="brand"
              fontSize={"xl"}
              type="submit"
              isLoading={isLoading}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  )
}
