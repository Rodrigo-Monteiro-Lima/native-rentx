import React, { useRef, useState } from 'react'
import { Container, ImageIndexes, ImageIndex, CarImageWrapper, CarImage } from './styles'
import { FlatList } from 'react-native'
import { ViewToken } from 'react-native';
import Bullet from '../Bullet';

interface Props {
  imagesUrl: string[]
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export default function ImageSlider({ imagesUrl }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setActiveImageIndex(index)
  })
  return (
    <Container>
      <ImageIndexes>
        {
          imagesUrl.map((_, index) => (
            <Bullet
              key={String(index)}
              active={index === activeImageIndex}
            />
          ))
        }
      </ImageIndexes>
      <FlatList
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: imagesUrl[0] }}/>
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  )
}