import { View, Text,Image, TextInput, ScrollView} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  SearchIcon, 
  UserIcon
} from "react-native-heroicons/outline"
import Catagories from '../components/Catagories';
import FeatureRow from '../components/FeatureRow';
import sanityClient from '../sanity';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCards, setFeaturedCards] = useState([]);
    

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    },[]);

    useEffect(() => {
      sanityClient.fetch(
        `
        *[ _type == "featured"] {
          ...,
          restaurant[]->{
            ...,
            dishes[]->
          }
        }
      `
      ).then(data => {
        setFeaturedCards(data);
      }).catch(err =>{
        console.log(err);
      })
    }, []);
  return (
    <SafeAreaView className='bg-white p-4'>
    {/* ====----Header -----===== */}

      <View className='flex-row items-center space-x-3'>
        <Image
            source={{
                uri:'https://links.papareact.com/wru'
            }}
            className='h-12 w-12 rounded-full bg-gray-300'
        />
        <View className='flex-1 justify-center'> 
            <Text className='font-bold text-gray-300'>Delivery now!</Text>
            <View className='flex-row items-center space-x-1'>
              <Text className='font-bold text-[18px]'>
              Current locations
              </Text>
              <ChevronDownIcon  color="#33d9b2" size={20}/>
            </View>
        </View>
        <View className='relative top-[5px]'>
          <UserIcon size={35} color='#33d9b2'/>
        </View>
      </View>
      {/* ====---- Search ---===== */}
      <View className='flex-row space-x-3 mt-3 items-center'>
        <View className='relative flex-1 flex-row bg-slate-200 items-center pl-2  rounded-2xl'>
        <SearchIcon size={20} color='#33d9b2'/>
          <TextInput
           className='p-2 w-full' 
           placeholder='Restaurant or Chaines'
           keyboardType='default'
            />
        </View>
        <AdjustmentsIcon size={30} color='#33d9b2'/>
      </View>

      {/* =======----- Body -----====== */}
      <ScrollView 
     showsHorizontalScrollIndicator={false}
      className='bg-gray-100 mt-5'
      contentContainerStyle={{
        paddingBottom: 100,
      }}
      >
        {/* ------ Catagories */}
        <Catagories/>
{/* ======--- Features ----===== */}
      {featuredCards?.map((item) =>(
        <FeatureRow 
        key={item._id}
        id={item._id}
        title={item.name}
        description={item.short_description}
      />
      ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen