import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'

const CatagoriesCard = ({imageUrl, title}) => {
  return (
    <TouchableOpacity className='relative mr-4 rounded overflow-hidden'>
    <Image 
        source={{
            uri: urlFor(imageUrl).url(),
        }}
        className='h-24 w-24'
    />
      <Text className='absolute bottom-2 left-2 font-bold text-center text-slate-100'>{title}</Text>
    </TouchableOpacity>
  )
}

export default CatagoriesCard