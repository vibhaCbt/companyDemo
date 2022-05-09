import { combineReducers } from '@reduxjs/toolkit'
import companyReducer from './companySlice'

export const rootReducers = combineReducers({
    company: companyReducer
})