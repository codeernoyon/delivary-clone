import { View, Text,ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import sanityClient from '../sanity';


const FeatureRow = ({id,title,description}) => {
  const [restaurants, setRestaurants] = useState([])
  useEffect(() => {
      sanityClient.fetch(`
      *[ _type == "featured" && _id == $id] {
        ...,
        restaurant[]->{
          ...,
          dishes[]->,
          type-> {
            name
          }
        }
      }[0]
      `,
      {id}).then(data => {
        setRestaurants(data.restaurant);
      })
  },[])
  return (
    <View>
        <View className='flex-row px-4 mt-4'>
        <Text className='font-bold text-lg flex-1'>{title}</Text>
        <ArrowRightIcon
            size={25}
            color='#33d9b2'
        />
        </View>
        <Text className='text-xs text-gray-500 px-4'>{description}</Text>
        <ScrollView
          horizontal
          contentContainerStyle={{
            paddingHorizontal: 15
          }}
          showsHorizontalScrollIndicator={false}
        >
          {/*  ------- Restaurant card  */}
          {restaurants?.map((restaurant, index) => (
          <RestaurantCard
          key={restaurant._id}
          id={restaurant._id}
          imgUrl={restaurant.image}
          title={restaurant.name}
          rating={restaurant.rating}
          genre={restaurant.genre}
          address={restaurant.address}
          short_description={restaurant.short_description}
          dishes={restaurant.dishes}
          long={restaurant.long}
          lat={restaurant.lat}
          />
          ))}
        </ScrollView>
    </View>
  )
}

export default FeatureRow