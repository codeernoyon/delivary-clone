import { View, Text,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CatagoriesCard from './CatagoriesCard'
import sanityClient from '../sanity';

const Catagories = () => {
  const [categorys, setCategorys] = useState([])
  useEffect(() => {
    sanityClient.fetch(`
    *[ _type == "category"] 
    `).then(data => {
      setCategorys(data)
    })
  },[])
  return (
    <ScrollView
    horizontal
    contentContainerStyle={{
      paddingHorizontal:15,
      paddingTop: 10,
    }}
    showsHorizontalScrollIndicator={false}
     className='flex-row'
    >
      {/* ------- Catagories Card --------- */}
      {categorys?.map(category => (
      <CatagoriesCard
        key={category._id}
       imageUrl={category.image} 
       title={category.name}/>
      ))}
      
    </ScrollView>
  )
}

export default Catagories