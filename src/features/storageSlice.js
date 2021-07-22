import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  {
    id: nanoid(),
    name: 'Create new item!',
    category: 'misc',
    flair: 'rgb(45,156,219)',
    bought: '2021-07-22',
    expires: '2221-07-21',
    amout: '0',
    unit: 'g',
  }
]

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    createItem(state, action) {
      state.push({
        id: nanoid(),
        name: action.payload.name,
        category: action.payload.category,
        flair: action.payload.flair,
        bought: action.payload.bought,
        expires: action.payload.expires,
        amout: parseFloat(action.payload.amout.toFixed(2)).toString(),
        unit: action.payload.unit
      })
    },
    removeItem(state, action) {
      const itemIndex = state.findIndex(element => element.id === action.payload)
      state.splice(itemIndex, 1)
    },
    editItem(state, action) {
      const itemIndex = state.findIndex(element => element.id === action.payload.id)
      state[itemIndex].name = action.payload.name
      state[itemIndex].category = action.payload.category
      state[itemIndex].flair = action.payload.flair
      state[itemIndex].bought = action.payload.bought
      state[itemIndex].expires = action.payload.expires
      state[itemIndex].amout = parseFloat(action.payload.amout.toFixed(2)).toString()
      state[itemIndex].unit = action.payload.unit
    },
    addToItem(state, action) {
      const itemIndex = state.findIndex(element => element.id === action.payload.id)
      const currAmout = parseFloat((Number(state[itemIndex].amout) + Number(action.payload.amout)).toFixed(2))
      state[itemIndex].amout = currAmout.toString()
    },
    subtToItem(state, action) {
      const itemIndex = state.findIndex(element => element.id === action.payload.id)
      const currAmout = parseFloat((Number(state[itemIndex].amout) - Number(action.payload.amout)).toFixed(2))
      state[itemIndex].amout = currAmout.toString()
    },
  }
})

export const {
  createItem,
  removeItem,
  editItem,
  addToItem,
  subtToItem
} = storageSlice.actions

export default storageSlice.reducer