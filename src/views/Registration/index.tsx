import React from "react"
import { Link as ReactRouterLink, useNavigate } from "react-router-dom"
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
import { useRegisterMutation } from "@features/auth/authApi"
import { useAppDispatch } from "@app/hooks"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const registrationFormSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
})

type RegistrationFormTyping = yup.InferType<typeof registrationFormSchema>

export default function Registration() {
  // Loading navigation from react-router-dom to redirect user after login
  const navigate = useNavigate()

  // Importing chakra's toast hook to display error messages
  const toast = useToast()

  // Getting RTK Query mutation hook to log in user
  const [signup, { isLoading }] = useRegisterMutation()

  // Using Redux to dispatch authenticate action
  const dispatch = useAppDispatch()

  // Setting up React Hook Form configuration with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormTyping>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(registrationFormSchema),
  })

  // Handling form submition and logging in user if successful
  const onSubmit: SubmitHandler<RegistrationFormTyping> = (data) => {
    signup({
      username: data.username,
      password: data.password,
    })
      .unwrap()
      .then((authState) => {
        // Redirecting user to login
        navigate("/login")
      })
      .catch((err) =>
        toast({
          title: "Error",
          description: err.data.message || "Something went wrong",
          status: "error",
        }),
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
              colorScheme="purple"
              type="submit"
              isLoading={isLoading}
              w={"full"}
            >
              Create account
            </Button>
          </VStack>
        </form>
        <ChakraLink
          as={ReactRouterLink}
          to={"/login"}
          textAlign={"center"}
          marginTop={2}
          display={"block"}
          color="purple.700"
        >
          Already have an account?
        </ChakraLink>
      </Box>
    </Center>
  )
}
