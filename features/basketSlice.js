import { createSlice } from '@reduxjs/toolkit'
import { startDetecting } from 'react-native/Libraries/Utilities/PixelRatio'

const initialState = {
  items: [],
}

export const counterSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      let newBasket = [...state.items];

      if(index >= 0){
        newBasket.splice(index, 1);
      }else{
        console.warn(
            `can't remove product (id: ${action.payload.id}) as it's not in basket`
        )
      }
      state.items = newBasket;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addBasket, removeFromBasket } = counterSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) => state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => {
  return total += item.price
}, 0); 
export default counterSlice.reducer