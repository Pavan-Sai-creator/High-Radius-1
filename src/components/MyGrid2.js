import {useEffect, useState} from 'react';
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import AddActor from './AddActor';
import EditActor from './EditActor';
import { Button } from '@mui/material';
import React from 'react';

function MyGrid2(){
    const [data,setData] = useState([]);
    const [actor,setActor] = useState({actor_id:'',first_name:'',last_name:''});
    const {first_name,last_name,actor_id} = actor;
    const [open,setOpen] = useState(false);

    const updateActor = async ({actor_id,first_name,last_name})=> {
      let data = "actor_id="+actor_id+"&first_name="+first_name+"&last_name="+last_name;
      let response = await axios.get("http://localhost:8080/backend2/update?"+data);
      return response.data;
    }

    const handleClose = (update) => {
      if(update){
        let response =  updateActor(actor);
      }
      setOpen(false);
    };

    const checkHandler = (actor_id) => {
        let editActor = data.filter(actor=>actor.actor_id == actor_id)[0];
        setActor(editActor);
    };


    const editHandler = ()=> {
      setOpen(true);
    }
    const deleteActor = async ({actor_id})=> {
      let data = "actor_id="+actor_id;
      let response = await axios.get("http://localhost:8080/backend2/delete?"+data);
      return response.data;
    }
    const deleteHandler = async ()=>{
      let response =  deleteActor(actor);
    }

    const changeHandler = (e)=>{
      const {name,value} = e.target;
      setActor({...actor,[name]:value});
    }

    const submitHandler = async (e)=>{
      e.preventDefault();
      let response = await addActor(actor);
      if(response){
        setActor({first_name:'',last_name:''});
      }
    }

    const addActor = async ({first_name,last_name})=> {
      let data = "first_name="+first_name+"&last_name="+last_name;
      let response = await axios.get("http://localhost:8080/backend2/addActor?"+data);
      return response.data;
    }


    const columns = [
      { field: 'actor_id', headerName: 'Actor ID', width: 150 },
      { field: 'first_name', headerName: 'Actor First Name', width: 700 },
      { field: 'last_name', headerName: 'Actor Last Name', width: 700 },
      // { field: 'column_0', headerName: 'Index', width: 150 },
      // { field: 'cust_number', headerName: 'Customer No.', width: 150 },
      // { field: 'buisness_year', headerName: 'Buisness Year', width: 150 },
      // { field: 'doc_id', headerName: 'Doc ID', width: 150 },
      // { field: 'converted_usd', headerName: 'Converted USD', width: 150 },
      // { field: 'business_code_enc', headerName: 'Buisness Code Enc.', width: 150 },
      // { field: 'name_customer_enc', headerName: 'Customer Name Enc.', width: 150 },
      // { field: 'cust_payment_terms_enc', headerName: 'Customer Payment Terms', width: 150 },
      // { field: 'day_of_postingdate', headerName: 'Posting Day', width: 150 },
      // { field: 'month_of_postingdate', headerName: 'Posting Month', width: 150 },
      // { field: 'year_of_postingdate', headerName: 'Posting Year', width: 150 },
      // { field: 'day_of_createdate', headerName: 'Create Day', width: 150 },
      // { field: 'month_of_createdate', headerName: 'Create Month', width: 150 },
      // { field: 'year_of_createdate', headerName: 'Create Year', width: 150 },
      // { field: 'day_of_due', headerName: 'Due Day', width: 150 },
      // { field: 'month_of_due', headerName: 'Due Month', width: 150 },
      // { field: 'year_of_due', headerName: 'Due Year', width: 150 },
      // { field: 'clear_date', headerName: 'Clear Date', width: 250 },
      // { field: 'aging_Bucket', headerName: 'Aging Bucket', width: 150 },

    ];

    useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios.get("http://localhost:8080/backend2/DataLoading")
      let data = response.data.actors;
      const data2 = data.map((actor,index)=>({...actor,id:index}))
      setData(data2);
    }

    fetchMyAPI()
  }, [])


  


    return <div style={{ height: 400, width: '100%' }}>
      <EditActor first_name={first_name} last_name={last_name} actor_id={actor_id} open={open} handleClose={handleClose} changeHandler={changeHandler}/>
      <AddActor 
      first_name={first_name} 
      last_name={last_name} 
      changeHandler={changeHandler}
      submitHandler={submitHandler}/>
      <br/>
      <Button varient="contained" onClick={editHandler}>Edit</Button>
      <Button varient="contained" onClick={deleteHandler}>Delete</Button>
      <DataGrid
          rows={data}
          columns={columns}
          rowsPerPageOptions={[5,10,20,100]}
          checkboxSelection
          onSelectionModelChange={(id) => {
            const selectedIDs = new Set(id);
            const selectedRows = data.filter((row) =>
              selectedIDs.has(row.id),
            );
            checkHandler(selectedRows[0].actor_id);
          }}
      />
    </div>
    
}

export default MyGrid2;