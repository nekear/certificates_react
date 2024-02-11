import React, { useEffect, useMemo, useState } from "react"
import { useGetCertificatesQuery } from "@features/certificates/certificatesApi"
import {
  Box,
  Button,
  Center,
  chakra,
  HStack,
  IconButton,
  Input,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { Edit, Frown, Plus, Search, Trash } from "react-feather";
import { Entities, Server } from "@app/types"
import { SubmitHandler, useForm } from "react-hook-form"
import dayjs from "dayjs"
import SortingIcon from "@components/SortingIcon"
import Pagination from "@components/Pagination"
import MutationModal from "@views/Certificates/components/MutationModal"
import DeletionModal from "@views/Certificates/components/DeletionModal"

interface SearchForm {
  search: string
}

export default function Certificates() {
  const [searchValue, setSearchValue] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [elementsPerPage, setElementsPerPage] = useState<number>(1)
  const [sorting, setSorting] = useState<Server.Certificates.Sorting>()

  // Getting certificates from RTK Query with filters, pagination and sorting
  const { data: certificates, isLoading } = useGetCertificatesQuery({
    filters: {
      main: searchValue,
    },
    pagination: {
      askedPage: currentPage,
      elementsPerPage: elementsPerPage,
    },
    sorting: sorting ? [sorting] : [],
  })

  // Creating React Hook Form configuration with Yup validation
  const {
    register,
    handleSubmit,
    setValue: setSearchFormValue,
  } = useForm<SearchForm>({
    defaultValues: {
      search: "",
    },
  })

  // Retrieving filtering meta from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    // Reading search values
    const search = urlParams.get("search")
    if (search) {
      setSearchValue(search)
      setSearchFormValue("search", search)
    }

    // Reading current page
    const page = urlParams.get("page")
    if (page) {
      setCurrentPage(Number(page))
    }

    // Reading elements per page
    const elements = urlParams.get("elementsPerPage")
    if (elements) {
      setElementsPerPage(Number(elements))
    }

    // Reading sorting
    const sortingColumn = urlParams.get("sortingColumn")
    const sortingDirection = urlParams.get("sortingDirection")
    if (sortingColumn && sortingDirection) {
      setSorting({
        column: sortingColumn as "name" | "date",
        direction: sortingDirection as "ASC" | "DESC",
      })
    }
  }, [])

  // Setting up request meta changes tracking to update browser url
  useEffect(() => {
    const urlParams = new URLSearchParams()

    // Adding search values
    if (searchValue.trim().length > 0) {
      urlParams.set("search", searchValue)
    }else{
      urlParams.delete("search")
    }

    // Adding current page
    if (currentPage !== 0) {
      urlParams.set("page", currentPage.toString())
    }

    // Adding elements per page
    if (elementsPerPage !== 1) {
      urlParams.set("elementsPerPage", elementsPerPage.toString())
    }

    // Adding sorting
    if (sorting) {
      urlParams.set("sortingColumn", sorting.column)
      urlParams.set("sortingDirection", sorting.direction)
    }

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`
    window.history.replaceState(null, "", newUrl)
  }, [searchValue, currentPage, elementsPerPage, sorting])

  // Extracting certificates from RTK Query response and parsing dates
  const certificatesList = useMemo<
    Entities.Certificate.Adapted[] | undefined
  >(() => {
    return (certificates?.payload ?? []).map((certificate) => ({
      ...certificate,
      createDate: dayjs(certificate.createDate),
      updateDate: dayjs(certificate.updateDate),
    }))
  }, [certificates])

  // Extracting pagination from RTK Query response
  const certificatesPagination = useMemo(() => {
    return certificates?.pagination
  }, [certificates])

  // Handling search submitting
  const onSearchSubmit: SubmitHandler<SearchForm> = (data) => {
    const trimmed = data.search.trim()
    setSearchValue(trimmed)
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

  const {
    isOpen: isMutationModalOpen,
    onOpen: onMutationModalOpen,
    onClose: onMutationModalClose,
  } = useDisclosure()
  const {
    isOpen: isDeletionModalOpen,
    onOpen: onDeletionModalOpen,
    onClose: onDeletionModalClose,
  } = useDisclosure()

  const [activeMutationCertificate, setActiveMutationCertificate] =
    useState<Entities.Certificate.Adapted>()

  const [activeDeletionCertificate, setActiveDeletionCertificate] =
    useState<Entities.Certificate.Adapted>()

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
        <Button
          rightIcon={<Plus />}
          colorScheme={"purple"}
          onClick={onMutationModalOpen}
        >
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
        <>
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
                  <Th>Description</Th>
                  <Th>Tags</Th>
                  <Th>Price</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {certificatesList?.map((certificate) => (
                  <Tr key={certificate.id}>
                    <Td>{certificate.createDate.format("YYYY-MM-DD")}</Td>
                    <Td>{certificate.name}</Td>
                    <Td>{certificate.description}</Td>
                    <Td>{certificate.tags.map((tag) => tag.name).join(",")}</Td>
                    <Td>{certificate.price}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          aria-label={"Edit certificate"}
                          icon={<Edit size={"16"} />}
                          colorScheme={"blue"}
                          size={"sm"}
                          onClick={() => {
                            setActiveMutationCertificate(certificate)
                            onMutationModalOpen()
                          }}
                        />
                        <IconButton
                          aria-label={"Delete certificate"}
                          icon={<Trash size={"16"} />}
                          colorScheme={"red"}
                          size={"sm"}
                          onClick={() => {
                            setActiveDeletionCertificate(certificate)
                            onDeletionModalOpen()
                          }}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {
            !certificatesList?.length && (
              <Center marginTop={8} height={200} flexDirection={"column"} gap={2} color={"brand.500"}>
                <Frown />
                <div>No certificates found</div>
              </Center>
            )
          }
          <HStack marginTop={4} justifyContent={"flex-end"}>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(
                (certificatesPagination?.totalElements ?? 1) / elementsPerPage,
              )}
              onPageChange={setCurrentPage}
            />
            <Select
              value={elementsPerPage}
              size={"sm"}
              onChange={(e) => {
                setElementsPerPage(parseInt(e.target.selectedOptions[0].value))
              }}
              w={100}
            >
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </Select>
          </HStack>
        </>
      )}

      <MutationModal
        isOpen={isMutationModalOpen}
        onClose={() => {
          onMutationModalClose()
          setActiveMutationCertificate(undefined)
        }}
        certificate={activeMutationCertificate}
      />

      <DeletionModal
        isOpen={isDeletionModalOpen}
        onClose={() => {
          onDeletionModalClose()
          setActiveDeletionCertificate(undefined)
        }}
        certificate={activeDeletionCertificate}
      />
    </Box>
  )
}
