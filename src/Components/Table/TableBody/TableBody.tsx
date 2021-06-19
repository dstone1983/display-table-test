import {FunctionComponent} from 'react';
import {Config, TableInterface} from "../types";

const TableBody:FunctionComponent<TableInterface> = ({config, data}) => {
    return (
        <tbody>
        {
            //loop through all data elements to render out the rows
            data.length ? data.map((dataItem, index: number) => {
                return (
                    <tr key={index}>
                        {
                            //loop through the config to render out each cell based on the data item in the iteration and the key provided in the config
                            config.map((configItem: Config, i: number) => {
                                const dataValue = dataItem[configItem.key]

                                return <td data-label={configItem.header} key={`${i}${dataValue}`}>{configItem.Cell ? configItem.Cell(dataValue) : dataValue}</td>
                            })
                        }
                    </tr>
                )
            })  : <tr><td colSpan={config.length}>No Data</td></tr>
        }
        </tbody>
    );
};

export default TableBody
