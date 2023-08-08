import React from "react"
import { IconButton } from "@chakra-ui/react"
import { ArrowDown, ArrowUp, Maximize2 } from "react-feather"

interface SortingIconProps {
  column: "name" | "date"
  currentSort?: { column: string; direction: string }
  onSort: (column: "name" | "date") => void
}

export default function SortingIcon({
  column,
  currentSort,
  onSort,
}: SortingIconProps) {
  const isActive = currentSort?.column === column
  const isAscending = currentSort?.direction === "ASC"

  return (
    <IconButton
      aria-label={`Sort by ${column}`}
      icon={
        isActive ? (
          isAscending ? (
            <ArrowUp />
          ) : (
            <ArrowDown />
          )
        ) : (
          <Maximize2 opacity={0.4} />
        )
      }
      onClick={() => onSort(column)}
      colorScheme={isActive ? "blue" : "ghost"}
      size="xs"
      marginLeft={2}
    />
  )
}
