import React, { useMemo, useState } from "react"
import { useGetCertificatesQuery } from "@features/certificates/certificatesApi"
import {
  Box,
  Button,
  Center,
  chakra,
  HStack,
  IconButton,
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
import { Server } from "@app/types"
import { SubmitHandler, useForm } from "react-hook-form"
import dayjs from "dayjs"
import SortingIcon from "@components/SortingIcon"

interface SearchForm {
  search: string
}

export default function Certificates() {
  const [searchValues, setSearchValues] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [elementsPerPage, setElementsPerPage] = useState<number>(10)
  const [sorting, setSorting] = useState<Server.Certificates.Sorting>()

  // Getting certificates from RTK Query with filters, pagination and sorting
  const { data: certificates, isLoading } = useGetCertificatesQuery({
    filters: {
      main: searchValues,
    },
    pagination: {
      askedPage: currentPage,
      elementsPerPage: elementsPerPage,
    },
    sorting: sorting ? [sorting] : [],
  })

  // Extracting certificates from RTK Query response and parsing dates
  const certificatesList = useMemo(() => {
    return certificates?.payload.map((certificate) => ({
      ...certificate,
      createDate: dayjs(certificate.createDate),
      updateDate: dayjs(certificate.updateDate),
    }))
  }, [certificates])

  // Extracting pagination from RTK Query response
  const certificatesPagination = useMemo(() => {
    return certificates?.pagination
  }, [certificates])

  // Creating React Hook Form configuration with Yup validation
  const { register, handleSubmit } = useForm<SearchForm>({
    defaultValues: {
      search: "",
    },
  })

  // Handling search submitting
  const onSearchSubmit: SubmitHandler<SearchForm> = (data) => {
    setSearchValues(data.search.split(" "))
  }

  // Handling certificates ordering
  const handleSort = (column: "name" | "date") => {
    let direction: "ASC" | "DESC" = "ASC"

    // If we're already sorting on this column, toggle the direction
    if (sorting?.column === column) {
      switch (sorting.direction) {
        case "ASC":
          setSorting({ column, direction: "DESC" })
          break
        case "DESC":
          setSorting(undefined)
          break
      }
    } else {
      setSorting({ column, direction })
    }
  }

  return (
    <Box>
      <HStack>
        <chakra.form w={"full"} onSubmit={handleSubmit(onSearchSubmit)}>
          <HStack>
            <Input {...register("search")} />
            <Button type="submit" isLoading={isLoading}>
              Search
            </Button>
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
                <Th>
                  Datetime
                  <SortingIcon
                    column={"date"}
                    currentSort={sorting}
                    onSort={handleSort}
                  />
                </Th>
                <Th>
                  Title
                  <SortingIcon
                    column={"name"}
                    currentSort={sorting}
                    onSort={handleSort}
                  />
                </Th>
                <Th>Tags</Th>
                <Th>Description</Th>
                <Th>Price</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {certificatesList?.map((certificate) => (
                <Tr key={certificate.id}>
                  <Td>{certificate.createDate.format("YYYY-MM-DD")}</Td>
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
