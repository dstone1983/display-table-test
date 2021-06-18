import {FunctionComponent} from 'react';
import {Config, TableInterface} from "../types";

const TableBody:FunctionComponent<TableInterface> = ({config, data}) => {
    return (
        <tbody>
        {
            data.map((dataItem, index: number) => {
                return (
                    <tr key={index}>
                        {
                            config.map((configItem: Config, i: number) => {
                                const dataValue = dataItem[configItem.key]

                                return <td key={`${i}${dataValue}`}>{configItem.Cell ? configItem.Cell(dataValue) : dataValue}</td>
                            })
                        }
                    </tr>
                )
            })
        }
        </tbody>
    );
};

export default TableBody;
