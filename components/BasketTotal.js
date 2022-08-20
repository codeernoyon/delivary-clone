import { View, Text } from 'react-native';
import React from 'react';
import {uesSelector, useSelector} from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';
import Currency from 'react-currency-formatter';

const BasketTotal = () => {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);
    
  return (
    <View 
    className='bg-[#33d9b2] px-8 py-3 flex-row items-center justify-between absolute w-full h-[80px] bottom-0 left-0 z-20'>
        <Text className='text-[25px] font-bold text-gray-200'>{items.length}</Text>
        <Text className='text-[18px] font-sm text-gray-200'>View Basket</Text>
        <Text className=' font-bold text-[18px] mt-2 text-gray-200'>
            <Currency quantity={basketTotal} currency="GBP"/>
        </Text>
    </View>
  )
}

export default BasketTotal