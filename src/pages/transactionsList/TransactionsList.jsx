import "./transactionsList.css"
import { DataGrid,} from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import {logout} from "../../redux/userRedux"
import { Link } from "react-router-dom";
import { useEffect} from "react";
import { deleteOrder, deleteProduct, getOrders, getProducts } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";


const Transactions = () => {
    const dispatch = useDispatch();
  

    const orders = useSelector((state)=> state.persistedReducer.order.orders);
  
  
  
    useEffect(()=>{
      console.log("HIIIIIIIIIIIIIIII")
      try {
        getOrders(dispatch);
      } catch (error) {
        console.log("Token has expired...")
        console.log("Dispatching Logout...")
        dispatch(logout());
      }
      
    },[dispatch]);
  
    const handleDelete = (id) => {
      deleteOrder(id, dispatch);
  };
  
  
  
  
  const columns = [
    { field: '_id', headerName: 'Database Id', width: 220 },
    { field: 'orderId', headerName: 'Order Id', width: 220 },
    { field: 'dataProducts', headerName: 'Products', width: 250, 
    renderCell: (params)=>{
        return (
            <div className="productListItem">
                
                {params.row.dataProducts}
            </div>
        );
    },
    },
    {
        field: 'amount',
        headerName: 'Total Cost',
        width: 160,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 120,
    },
    {
        field:"createdAt",
        headerName:"Date Ordered",
        width: 150,
        renderCell: (params)=>{
        const createdDate = new Date(params.row.createdAt).toDateString();
            return(

                <>
                <p>{createdDate}</p>
                </>
                
                
            );
        },
    },
      {
        field:"action",
        headerName:"Action",
        width: 150,
        renderCell: (params)=>{
            return(
  
                <>
                
                <DeleteOutline className="productListDelete" onClick={()=>handleDelete(params.row._id)}/>
                </>
                
            );
        },
      },
    
      
  ];
  
    return (
      <div className="products">
        <div className="createButton">
        <h1 className="productTitle">Product List</h1>
              
        </div>
  
      
      <div className="productList">
        <DataGrid
          
          rows={orders}
          disableSelectionOnClick
          getRowHeight={() => 'auto'}
          columns={columns}
          getRowId={(row)=>row._id}
          pageSize={8}
          checkboxSelection
        />
      </div>
      </div>
    )
}

export default Transactions