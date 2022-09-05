import {createSlice} from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name:"order",
    initialState:{
        orders: [],
        isFetching: false,
        error: false,
        
    },
    reducers:{

        //GET ALL
        getOrderStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        getOrderSuccess:(state, action)=>{
            state.isFetching = false;
            state.orders = action.payload;
        },
        getProductFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        //DELETE
        deleteOrderStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        deleteOrderSuccess:(state, action)=>{
            state.isFetching = false;
            state.orders.splice(
                state.orders.findIndex((item)=>item._id===action.payload), 
                1
            );
        },
        deleteOrderFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        
        
    },
});

export const {
    getOrderStart,
    getOrderSuccess,
    getOrderFailure,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailure,
} = orderSlice.actions

export default orderSlice.reducer;

export const selectOrder = (state) => state.order.orders;