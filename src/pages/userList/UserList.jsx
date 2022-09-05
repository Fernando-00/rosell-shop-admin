import "./userList.css"
import { DataGrid,} from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";
import { deleteClient, getClients } from "../../redux/apiCalls";

export default function UserList() {

    const dispatch = useDispatch();

    const clients = useSelector((state)=> state.persistedReducer.client.clients);

    useEffect(()=>{
        console.log("HIIIIIIIIIIIIIIII")
        try {
          getClients(dispatch);
        } catch (error) {
          console.log("Token has expired...")
          console.log("Dispatching Logout...")
          dispatch(logout());
        }
        
      },[dispatch]);
    
      const handleDelete = (id) => {
        console.log("Deleting CLIENT")
        deleteClient(id, dispatch);
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'user', headerName: 'User', width: 250, renderCell: (params)=>{
            return (
                <div className="userListUser">
                    <img className="userListImg" src={params.row.img} alt=""/>
                    {params.row.username}
                </div>
            );
        },
       },
        { field: 'email', headerName: 'Email', width: 200 },
        {
          field: 'status',
          headerName: 'Status',
          width: 120,
        },
        {
            field: 'transaction',
            headerName: 'Transaction Volume',
            width: 160,
          },
          {
            field:"action",
            headerName:"Action",
            width: 150,
            renderCell: (params)=>{
                return(

                    <>
                    <Link to={"/user/" + params.row._id}>
                    <button className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutline className="userListDelete" onClick={()=>handleDelete(params.row._id)}/>
                    </>
                    
                );
            },
          },
        
          
      ];
      
      

  return (

    <div className="users">
      <div className="createButton">
      <h1 className="ClientTitle">Client List</h1>
            <Link to="/newuser">
            <button className="clientAddButton">Create</button>
            </Link>
      </div>
    


    <div className="userList">
        <DataGrid
        
        rows={clients}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
    </div>
  );
}
