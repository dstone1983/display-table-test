import {FunctionComponent} from "react";
import TableHead from "./TableHead/TableHead";
import TableBody from "./TableBody/TableBody";
import {TableInterface} from "./types";
import "./table.scss"
import classNames from "classnames";


const Table: FunctionComponent<TableInterface> = ({config, data, className}) => {
    return (
        <table className={classNames('table-component', className)}>
            <TableHead config={config} />
            <TableBody config={config} data={data} />
        </table>
    )
}

export default Table