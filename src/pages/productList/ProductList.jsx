import "./productList.css"
import { DataGrid,} from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import {logout} from "../../redux/userRedux"
import { Link } from "react-router-dom";
import { useEffect} from "react";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";


export default function ProductList() {

  
  const dispatch = useDispatch();
  

  const products = useSelector((state)=> state.persistedReducer.product.products);



  useEffect(()=>{
    console.log("HIIIIIIIIIIIIIIII")
    try {
      getProducts(dispatch);
    } catch (error) {
      console.log("Token has expired...")
      console.log("Dispatching Logout...")
      dispatch(logout());
    }
    
  },[dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
};




const columns = [
  { field: '_id', headerName: 'ID', width: 220 },
  { field: 'product', headerName: 'Product', width: 250, 
  renderCell: (params)=>{
      return (
          <div className="productListItem">
              <img className="productListImg" src={params.row.img} alt=""/>
              {params.row.title}
          </div>
      );
  },
 },
  { field: 'inStock', headerName: 'Stock', width: 200 },
  
  {
      field: 'storePrice',
      headerName: 'StorePrice',
      width: 160,
    },
    {
      field: 'inventoryPrice',
      headerName: 'InventoryPrice',
      width: 160,
    },
    {
      field:"action",
      headerName:"Action",
      width: 150,
      renderCell: (params)=>{
          return(

              <>
              <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
              </Link>
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
            <Link to="/newproduct">
            <button className="productAddButton">Create</button>
            </Link>
      </div>

    
    <div className="productList">
      <DataGrid
        
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
    </div>
  )
}
