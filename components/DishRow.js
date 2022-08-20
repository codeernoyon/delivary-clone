import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';
import { addBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';



const DishRow = ({
    id,
    name,
    description,
    image,
    price,
}) => {
  const[isPress, setIsPress] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

//  Add items in the basket
  const addItemToBasket = () => {
      dispatch(addBasket({id, name, description, price, image})); 
  }

//  Remove item from basket
  const removeItemFromBasket = () => {
    if(!items.length > 0 ) return;
    dispatch(removeFromBasket({ id }));
  }
  return (
    <TouchableOpacity 
    onPress ={() => setIsPress(!isPress)}
    className={`border-b-[1px] border-slate-100 py-2 transition-all ease-in-out ${isPress && " border-gray-300 bg-white"} `}
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
                  <TouchableOpacity
                    onPress={removeItemFromBasket}
                  >
                    <MinusCircleIcon 
                    color={!items.length <= 0 ? "#33d9b2" : "gray"}
                    size={30}/>
                </TouchableOpacity>
                  <Text className='text-[25px] font-bold relative top-[-3px] text-emerald-700'>{items.length}</Text>
                  <TouchableOpacity
                    onPress={addItemToBasket}
                  >
                    <PlusCircleIcon size={30} color='#33d9b2'/>
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