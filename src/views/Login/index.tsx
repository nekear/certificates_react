import React from "react"
import { Link as ReactRouterLink, useNavigate } from "react-router-dom"
import { authApi, useLoginMutation } from "@features/auth/authApi"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAppDispatch } from "@app/hooks"
import { authenticate, setUser } from "@features/auth/authSlice";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react"
import { isErrorWithMessage } from "@app/query"

type LoginForm = {
  username: string
  password: string
}

export default function Login() {
  // Loading navigation from react-router-dom to redirect user after login
  const navigate = useNavigate()

  // Importing chakra's toast hook to display error messages
  const toast = useToast()

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
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    let meQuery
    try {
      const loginResponse = await login({
        username: data.username,
        password: data.password,
      }).unwrap()

      dispatch(
        authenticate({
          token: loginResponse.token,
        }),
      )

      meQuery = dispatch(authApi.endpoints.getMe.initiate(undefined, {forceRefetch: true}))

      const meResponse = await meQuery.unwrap()

      dispatch(
        setUser({
          username: meResponse.username,
          role: meResponse.role,
        }),
      )

      // Redirecting user to Certificates page
      navigate("/")
    } catch (e) {
      toast({
        title: "Error",
        description: isErrorWithMessage(e) ? e.message : "Something went wrong",
        status: "error",
      })
    } finally {
      meQuery?.unsubscribe()
    }
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
              colorScheme="purple"
              type="submit"
              isLoading={isLoading}
              w={"full"}
            >
              Login
            </Button>
          </VStack>
        </form>
        <ChakraLink
          as={ReactRouterLink}
          to={"/register"}
          textAlign={"center"}
          marginTop={2}
          display={"block"}
          color="purple.700"
        >
          Don't have an account yet?
        </ChakraLink>
      </Box>
    </Center>
  )
}
