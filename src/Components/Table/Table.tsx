import {FunctionComponent} from "react";
import TableHead from "./TableHead/TableHead";
import TableBody from "./TableBody/TableBody";
import {TableInterface} from "./types";
import "./table.scss"
import classNames from "classnames";

//React simple table component
//Takes a config and data, data should be a more simplified array of object structure nested objects/arrays doesn't play nicely
const Table: FunctionComponent<TableInterface> = ({config, data, className}) => {
    return (
        <table className={classNames('table-component', className)}>
            <TableHead config={config} />
            <TableBody config={config} data={data} />
        </table>
    )
}

export default Table