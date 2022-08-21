import { View, Text, Image, TouchableOpacity,ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { urlFor } from '../sanity';
import { ArrowRightIcon, StarIcon } from 'react-native-heroicons/solid';
import { LocationMarkerIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketTotal from '../components/BasketTotal';


const RestaurantScreen = () => {
    const navigation = useNavigation()

    const {
        params:{
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
    }} = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    },[]);
  return (
    <SafeAreaView className='relative'>
        <ScrollView className='relative'>
            <Image 
            source={{
                uri: urlFor(imgUrl).url(),
              }}
              className='h-60 w-full' 
            />
            <View className="px-4 py-3 bg-white">
                <View>
                <Text className='font-bold text-xl'>{title}</Text>
                <View className='flex-row space-x-2 mt-1 '>
                    <View className="flex-row items-center space-x-1">
                        <StarIcon size={25} color='#33d9b2' opacity={.5}/> 
                        <Text className=' text-gray-500'>{rating} </Text>
                    </View>
                    <View className='flex-row space-x-1 text-gray-500'>
                        <LocationMarkerIcon size={25} color='#33d9b2' opacity={.5}/>
                        <Text className='text-gray-500'>{address}</Text>
                    </View>
                </View>
                <View className='mt-3'>
                    <Text className=''>{short_description}</Text>
                </View>
                </View>
                <View className='flex-row py-3 items-center mt-1'>
                    <View className='flex-row flex-1 space-x-2 items-center'>
                        <QuestionMarkCircleIcon size={20} color='#bdc3c7'/>
                        <Text className='font-bold text-lg'>Have a food allergy?</Text>
                    </View>
                        <ArrowRightIcon size={25} color='#33d9b2'/>
                </View>
            </View>
            <View className=' pb-[85px] bg-[#f1f2f6]'> 
                <Text className='font-bold text-2xl py-5 px-4 bg-gray-200'>Menu</Text>
                
                    {dishes?.map((dish) => (
                        <DishRow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))}
            </View>
        </ScrollView>
        {/* ====--- Basket total----===== */}
        <BasketTotal />
    </SafeAreaView>
  )
}

export default RestaurantScreen