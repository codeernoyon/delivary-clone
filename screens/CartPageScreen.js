import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';


const CartPageScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const total = useSelector(selectBasketTotal);
  const items = useSelector(selectBasketItems);
  const [groupItems, setGroupItems] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
      const groupItem = items.reduce((results, item) =>{
        (results[item.id] = results[item.id] || []).push(item);
        return results;
      },{});
      setGroupItems(groupItem)
  },[items])
  return (
    <SafeAreaView className='relative flex-1'>
      {/* ====----- Restaurant details ----======== */}
      <View className=' h-[85px] w-full items-center justify-center bg-white'>
        <Text className='font-bold text-xl uppercase text-emerald-400'>Cart</Text>
        <Text className='text-sm'>{restaurant.title}</Text>
      </View>
      {/* ====--- Delivery Time ----====== */}
      <View className='flex-row space-x-3 items-center px-4 py-5 bg-white mt-4 mb-3'>
        <Image 
        source={{
          uri:'https://links.papareact.com/wru'
        }}
        className='w-10 h-10 rounded-full'
        />
        <Text className='flex-1 text-[18px] font-semibold'>Delivery in 50-70 mins</Text>
        <Text className='text-[18px] text-emerald-500'>Change</Text>
      </View>
      {/* ========---- Cart Items ----========= */}
      <ScrollView className='relative divide-y divide-gray-200'>
        {Object.entries(groupItems).map(([key, items]) => (
          <View key={key}
            className='flex-row items-center space-x-3 px-4 bg-white py-4 mt-1'>
            <Image
              source={{
                uri: urlFor(items[0]?.image).url()
              }}
              className="h-16 w-16 rounded-full"
            />
            <View className='flex-row space-x-1 flex-1 items-center'>
              <Text className='font-semibold text-[17px]'>{items[0]?.name}</Text>
              <Text className="font-semibold text-[16px]">({items?.length})</Text>
            </View>
            <Text className='font-bold text-[17px]'>
                <Currency quantity={items[0]?.price} currency="GBP"/>
            </Text>
            <TouchableOpacity
              onPress={() => dispatch(removeFromBasket({ id: key }))}
            >
              <Text  className='text-[16px] text-emerald-500'>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
        <View className=' bg-white py-5 px-4 space-y-3 border-t-[1px] border-gray-300'>
          {/* ====-----sub Total ----======== */}
          <View className="flex-row items-center">
          <Text className='flex-1 text-[16px] text-gray-500'>Subtotal</Text>
              <Text className='text-[17px] font-bold text-emerald-500'>
                <Currency quantity={total} currency='GBP'/>
              </Text>
          </View>
          {/* ====-----Delivery Charge ----======== */}
          <View className="flex-row items-center">
          <Text className='flex-1 text-[16px] text-gray-500'>Delivery fee</Text>
              <Text className='text-[17px] font-bold text-emerald-500'>
                <Currency quantity={8.0} currency='GBP'/>
              </Text>
          </View>
          {/* ====-----Delivery Charge ----======== */}
          <View className="flex-row items-center">
          <Text className='flex-1 text-[16px] font-semibold'>Total</Text>
              <Text className='text-[17px] font-bold text-emerald-500'>
                <Currency quantity={total  + 8.0} currency='GBP'/>
              </Text>
          </View>
          <TouchableOpacity className='justify-center items-center mt-2'>
            <View className='py-4 w-[300px] bg-emerald-500 rounded-md items-center'>
                <Text className='font-bold text-[18px] text-slate-100'>Place Order</Text>
            </View>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default CartPageScreen