import React, { useState } from "react"
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Tag,
  TagCloseButton,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Entities } from "@app/types"
import { PartialBy } from "@app/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useCreateCertificateMutation } from "@features/certificates/certificatesApi"

interface MutationModalProps {
  isOpen: boolean
  onClose: () => void
}

interface MutationForm {
  title: string
  description: string
  duration: number
  price: number
  tags: PartialBy<Entities.Tag, "id">[]
}

export default function MutationModal({ isOpen, onClose }: MutationModalProps) {
  const toast = useToast()

  const [createCertificate, { isLoading }] = useCreateCertificateMutation()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<MutationForm>({
    defaultValues: {
      title: "",
      description: "",
      duration: 0,
      price: 0,
      tags: [],
    },
    resolver: yupResolver(
      yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        duration: yup
          .number()
          .typeError("Duration must be a number")
          .min(0)
          .required("Duration is required"),
        price: yup
          .number()
          .typeError("Price must be a number")
          .min(0)
          .required("Price is required"),
        tags: yup
          .array()
          .of(
            yup.object().shape({
              id: yup.number(),
              name: yup.string().required(),
            }),
          )
          .required(),
      }),
    ),
  })

  const [tagsInputValue, setTagsInputValue] = useState<string>("")

  const onSubmit: SubmitHandler<MutationForm> = (data) => {
    createCertificate({
      name: data.title,
      description: data.description,
      duration: data.duration,
      price: data.price,
      tags: data.tags.map((tag) => ({ name: tag.name })),
    })
      .unwrap()
      .then(() => {
        onClose()
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
        })
      })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <VStack spacing={2}>
                {/* Title */}
                <FormControl isInvalid={!!errors.title}>
                  <FormLabel>Title</FormLabel>
                  <Input {...register("title")} />
                  <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                </FormControl>

                {/* Description */}
                <FormControl isInvalid={!!errors.description}>
                  <FormLabel>Description</FormLabel>
                  <Input {...register("description")} />
                  <FormErrorMessage>
                    {errors.description?.message}
                  </FormErrorMessage>
                </FormControl>

                {/* Duration */}
                <FormControl isInvalid={!!errors.duration}>
                  <FormLabel>Duration</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField {...register("duration")} />
                  </NumberInput>
                  <FormErrorMessage>
                    {errors.duration?.message}
                  </FormErrorMessage>
                </FormControl>

                {/* Price */}
                <FormControl isInvalid={!!errors.price}>
                  <FormLabel>Price</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField {...register("price")} />
                  </NumberInput>
                  <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                </FormControl>

                {/* Tags */}
                <FormControl isInvalid={!!errors.tags}>
                  <FormLabel>Tags</FormLabel>
                  <Input
                    value={tagsInputValue}
                    onChange={(e) => {
                      setTagsInputValue(e.target.value)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setValue(
                          "tags",
                          [...getValues("tags"), { name: tagsInputValue }],
                          {
                            shouldValidate: true,
                          },
                        )

                        setTagsInputValue("")
                      }
                    }}
                  />
                  <HStack spacing={2} w={"full"} marginTop={2}>
                    {getValues("tags").map((tag, index) => (
                      <Tag key={index}>
                        {tag.name}
                        <TagCloseButton
                          onClick={() => {
                            setValue(
                              "tags",
                              getValues("tags").filter((_, i) => i !== index),
                              {
                                shouldValidate: true,
                              },
                            )
                          }}
                        />
                      </Tag>
                    ))}
                  </HStack>
                  <FormErrorMessage>{errors.tags?.message}</FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="purple" type="submit" isLoading={isLoading}>
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
