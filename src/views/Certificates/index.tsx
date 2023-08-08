import React from "react"
import { useGetCertificatesQuery } from "@app/api"
import {
  Box,
  Button,
  Center,
  chakra,
  HStack,
  Input,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { Plus } from "react-feather"

export default function Certificates() {
  const { data: certificates, isLoading } = useGetCertificatesQuery()

  return (
    <Box>
      <HStack>
        <chakra.form w={"full"}>
          <HStack>
            <Input />
            <Button type="submit">Search</Button>
          </HStack>
        </chakra.form>
        <Button rightIcon={<Plus />} colorScheme={"purple"}>
          Add
        </Button>
      </HStack>
      {isLoading ? (
        <Center marginTop={8}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.900"
            size="xl"
          />
        </Center>
      ) : (
        <TableContainer marginTop={8}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Datetime</Th>
                <Th>Title</Th>
                <Th>Tags</Th>
                <Th>Description</Th>
                <Th>Price</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {certificates?.payload.map((certificate) => (
                <Tr key={certificate.id}>
                  <Td>{certificate.createDate}</Td>
                  <Td>{certificate.name}</Td>
                  <Td>{certificate.tags.map((tag) => tag.name).join(",")}</Td>
                  <Td>{certificate.description}</Td>
                  <Td>{certificate.price}</Td>
                  <Td>actions</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
