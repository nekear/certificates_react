import React from "react"
import {
  chakra,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  Select,
  Spacer,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()

  return (
    <Flex alignItems="center" bg="#fff" height="80px" padding={"0 40px"}>
      <Flex gap={4} alignItems="center">
        <IconButton
          aria-label={"Menu"}
          variant="ghost"
          size={"lg"}
          icon={
            <chakra.span className="material-icons-outlined" fontSize={40}>
              menu
            </chakra.span>
          }
        />
        <Heading as="h4" size="md">
          Logo
        </Heading>
      </Flex>
      <Spacer />
      <Flex>
        <Input
          placeholder="Search by item name"
          variant="outline"
          width={300}
        />
        <Select placeholder="All categories" width={150} borderLeft={0}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Flex>
      <Spacer />
      <Flex gap={2} alignItems={"center"}>
        <IconButton
          aria-label={"Favorite"}
          variant="ghost"
          icon={<span className="material-icons-outlined">favorite</span>}
        />
        <IconButton
          aria-label={"Shopping cart"}
          variant="ghost"
          icon={<span className="material-icons-outlined">shopping_cart </span>}
        />
        <Button variant={"ghost"} onClick={() => navigate("login")}>
          Login
        </Button>
        <Divider orientation="vertical" height={"20px"} />
        <Button variant={"ghost"} onClick={() => navigate("register")}>
          Sign up
        </Button>
      </Flex>
    </Flex>
  )
}
