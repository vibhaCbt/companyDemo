import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { companyTodo, companyTodoArr } from '../model'

const initialState:companyTodoArr = {
    companyTodo : [
        // {
        //     companyId: 1,
        //     companyName: 'Compny 1',
        //     companyLocation: 'Company Location 1',
        //     companyCode: 'Company Code 1'
        // },
        // {
        //     companyId: 2,
        //     companyName: 'Compny 2',
        //     companyLocation: 'Company Location 2',
        //     companyCode: 'Company Code 2'
        // }
    ]
}

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        addCompanyData: (state, action: PayloadAction<companyTodo>) =>{
            const {companyName, companyLocation, companyCode} = action.payload
            state.companyTodo = [{companyId: new Date().getTime(), companyName: companyName, companyLocation: companyLocation, companyCode: companyCode}, ...state.companyTodo]
        },
        removeCompanyData: (state, action: PayloadAction<number>) =>{
            state.companyTodo = state.companyTodo.filter((elem) => elem.companyId !== action.payload)
        },
        updateCompanyData: (state, action: PayloadAction<companyTodo>)=>{
            const {companyId, companyName, companyLocation, companyCode} = action.payload
            state.companyTodo = state.companyTodo.map((elem) => elem.companyId == companyId ? action.payload : elem)
        }
    }
})

// Action creators are generated for each case reducer function
export const { addCompanyData, removeCompanyData, updateCompanyData } = companySlice.actions

export default companySlice.reducer