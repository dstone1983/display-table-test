import {Config} from "../types";
import {FunctionComponent} from "react";

interface TableHeadType {
    config: Config[]
}

const TableHead: FunctionComponent<TableHeadType> = ({config}) => {
    return (
        <thead>
            <tr>
                {
                    //loop through the config and grab the value from the header key to show the proper header
                    config.map((configItem: Config, index: number) => <th key={index}>{configItem.header}</th>)
                }
            </tr>
        </thead>
    )
}

export default TableHead