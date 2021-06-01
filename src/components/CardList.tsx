import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  function handleOpenModalImage(url: string): void {
    onOpen();
    setSelectedImageUrl(url);
  }

  return (
    <>
      <SimpleGrid columns={3} spacing={10} id="cards">
        {cards.map(card => (
          <Card
            data={card}
            viewImage={url => handleOpenModalImage(url)}
            key={card.id}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={selectedImageUrl}
      />
    </>
  );
}
