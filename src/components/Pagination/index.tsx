import React from "react"
import { Button, HStack, IconButton } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight } from "react-feather"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const firstPage = Math.max(currentPage - 2, 0)
  const lastPage = Math.min(firstPage + 5, totalPages)

  return (
    <HStack spacing={1}>
      <IconButton
        aria-label="Previous page"
        icon={<ChevronLeft />}
        isDisabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        size={"sm"}
      />
      {Array.from({ length: lastPage - firstPage }, (_, index) => (
        <Button
          key={index}
          onClick={() => onPageChange(firstPage + index)}
          colorScheme={firstPage + index === currentPage ? "purple" : "gray"}
          size={"sm"}
        >
          {firstPage + index + 1}
        </Button>
      ))}
      <IconButton
        aria-label="Next page"
        icon={<ChevronRight />}
        size={"sm"}
        isDisabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </HStack>
  )
}
