import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Link} from "@mui/material";
import {MetaModel} from "../pflow";

export default function ModelList() {

    const models = [] as Array<MetaModel>; // FIXME
    if (models.length === 0) {
        return <React.Fragment/>;
    }

    return (
        <TableContainer>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Model</TableCell>
                        <TableCell>Source</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {models.map((model: MetaModel) => (
                        <TableRow
                            key={model.m.def.schema + "_list"}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                <Link href={"?cid= model.source.cid &run=model.cid"}>
                                    <img width="300px" src={"model.image"}/>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={"?cid=model.source.cid&view=model.cid"}>
                                    {model.m.def.schema} - {"model.path"}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
