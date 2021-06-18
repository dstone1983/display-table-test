import {FunctionComponent} from "react";
import TableHead from "./TableHead/TableHead";
import TableBody from "./TableBody/TableBody";
import {TableInterface} from "./types";


const Table: FunctionComponent<TableInterface> = ({config, data}) => {
    return (
        <table>
            <TableHead config={config} />
            <TableBody config={config} data={data} />
        </table>
    )
}

export default Table