import React from "react"
import {
  Badge,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"
import { User } from "react-feather"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { logout } from "@features/auth/authSlice"

export default function Header() {
  const navigate = useNavigate()

  // Getting auth state from Redux to display the login state
  const authState = useAppSelector((state) => state.auth)

  // Using Redux to dispatch logout action
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Flex
      alignItems="center"
      bg="#fff"
      height="80px"
      padding={"0 40px"}
      borderBottomWidth={1}
      borderColor={"gray.200"}
    >
      <Flex gap={4} alignItems="center">
        <Heading as="h4" size="md" textTransform={"uppercase"}>
          Certificates
        </Heading>
      </Flex>

      <Spacer />

      {authState.isAuthenticated ? (
        <Flex gap={2} alignItems={"center"}>
          <HStack spacing={4} padding={4}>
            <User />
            <Text fontWeight={"semibold"}>{authState.user?.username} | <Badge>{authState.user?.role}</Badge></Text>
          </HStack>
          <Divider orientation="vertical" height={"20px"} />
          <Button variant={"ghost"} onClick={handleLogout}>
            Log out
          </Button>
        </Flex>
      ) : (
        <Button variant={"ghost"} onClick={() => navigate("login")}>
          Login
        </Button>
      )}
    </Flex>
  )
}
