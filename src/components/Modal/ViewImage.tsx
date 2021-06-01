import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Text,
  Flex,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="rgba(0,0,0,0.8)" />
      <ModalContent>
        <ModalBody p="0">
          <Image src={imgUrl} />
        </ModalBody>
        <ModalFooter
          h="32px"
          bg="#353431"
          c="#F3F2F2"
          borderRadius="0px 0px 6px 6px"
          p="0"
        >
          <Flex w="100%" pl="10px">
            <Link href={imgUrl} target="_blank" fontSize="14px" c="#F3F2F2">
              Abrir original
            </Link>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
