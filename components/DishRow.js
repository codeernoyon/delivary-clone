import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline';



const DishRow = ({
    name,
    description,
    image,
    price
}) => {
  const[isPress, setIsPress] = useState(false);
  return (
    <TouchableOpacity 
    onPress ={() => setIsPress(!isPress)}
    className={`border-gray-300 py-2 transition-all ease-in-out ${isPress && "border-b-[1px]"} `}
    >
    <View 
        className='flex-row justify-between items-center px-4'
        >
        <View className='py-4'>
            <Text className='font-bold text-lg py-1'>{name}</Text>
            <Text className='text-gray-500 mb-1'>{description}</Text>
            <View className='flex-row items-center space-x-10'>
              <Text className='text-emerald-700 font-bold text-[16px] mt-2'>
                <Currency quantity={price} currency="GBP"/>
              </Text>
            </View>
            {isPress && <View className='absolute bottom-[8px] left-[120px] flex-row space-x-3 z-10'>
                  <TouchableOpacity>
                    <MinusCircleIcon size={30} color='black'/>
                </TouchableOpacity>
                  <Text className='text-[25px] font-bold relative top-[-3px]'>0</Text>
                  <TouchableOpacity>
                    <PlusCircleIcon size={30} color='black'/>
                  </TouchableOpacity>
              </View>
              }
        </View>
        <Image 
            source={{
                uri: urlFor(image).url()
            }}
            className='h-24 w-32 rounded'
        />
    </View>
    </TouchableOpacity>
  )
}

export default DishRow