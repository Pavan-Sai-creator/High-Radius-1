import {Grid,Box,CssBaseline, TableContainer, Table, TableHead, Paper, TableRow, TableCell, TableBody} from "@mui/material";
import {useEffect, useState} from 'react';
import {getData} from '../services/data';

function MyGrid(){
    const [data,setData] = useState([]);
    useEffect(async ()=> {
        setData(await getData())
    },[]);

    return <>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Actor ID</TableCell>
            <TableCell>Actor First Name</TableCell>
            <TableCell>Actor Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map(actor => (
            <TableRow
              key={actor.actor_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{actor.actor_id}</TableCell>
              <TableCell>{actor.first_name}</TableCell>
              <TableCell>{actor.last_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
}

export default MyGrid;