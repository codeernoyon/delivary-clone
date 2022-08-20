import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { LocationMarkerIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
    onPress={() => {
      navigation.navigate("Restaurant",{
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat
      })
    }}
    className='rounded overflow-hidden pb-3 bg-white shadow mr-3 mt-2'>
      
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className='h-32 w-64'
      />
      <Text className='font-bold text-xl mt-2 px-3'>{title}</Text>
      <View className=' flex-row space-x-1 items-center mt-1 px-2'>
        <StarIcon size={30} color='#33d9b2' opacity={.5}/>
        <Text className='text-gray-500'>
          <Text className='text-green-600 opacity-{0.5}'>{rating} </Text>
           . {genre}
        </Text>
      </View>
      <View className='flex-row space-x-1 items-center mt-1 px-2'>
        <LocationMarkerIcon size={25} color='#33d9b2' opacity={.5}/>
        <Text className='text-gray-500 opacity-[0.6]'>nearby . {address}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard