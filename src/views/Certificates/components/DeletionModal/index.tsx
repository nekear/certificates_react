import React from "react"
import { Entities } from "@app/types"
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react"
import { useDeleteCertificateMutation } from "@features/certificates/certificatesApi"

interface DeletionModalProps {
  isOpen: boolean
  onClose: () => void
  certificate?: Entities.Certificate.Adapted
}

export default function DeletionModal({
  isOpen,
  onClose,
  certificate,
}: DeletionModalProps) {
  const toast = useToast()

  const [deleteCertificate, { isLoading }] = useDeleteCertificateMutation()

  const handleDelete = () => {
    if (certificate)
      deleteCertificate(certificate.id)
        .unwrap()
        .then(() => {
          onClose()
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "An error occurred while deleting the certificate",
            status: "error",
          })
        })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this certificate?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleDelete}
              isLoading={isLoading}
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
