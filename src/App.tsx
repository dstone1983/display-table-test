import React, {useEffect, useState} from 'react';
import './App.css';
import Table from "./Components/Table/Table";
import axios, {AxiosResponse} from "axios";
import {Config} from "./Components/Table/types";
import moment from "moment";

interface PlayonData {
    items: PlayonItems[]
}

interface PlayonItems {
    start_time: string;
    level: string;
    key: string;
    sport: string;
    publishers: Publishers[]
}

interface Publishers {
    broadcasts: BroadCasts[]
}

interface BroadCasts {
    headline: string;
    subheadline: string
}

const config: Config[] = [
    {
        header: 'Key',
        key: 'key'
    },
    {
        header: 'Headline',
        key: 'publishers',
        Cell: (data: Publishers[]) => <span>{data[0].broadcasts[0].headline}</span>
    },
    {
        header: 'SubHeadline',
        key: 'publishers',
        Cell: (data: Publishers[]) => <span>{data[0].broadcasts[0].subheadline}</span>
    },
    {
        header: 'Start Time',
        key: 'start_time',
        Cell: (data: string) => {
            const date = moment(data).format('MMMM Do YYYY h:mm a')

            return <span>{date}</span>
        }
    }
]

function App() {
    const [data, setData] = useState<PlayonItems[]>([])
    const [error, setError] = useState("")

    useEffect(() => {
        axios.get('https://search-api.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=18bad24aaa&amp;card=true&amp;size=50&amp;start=0').then((res: AxiosResponse<PlayonData>) => {
            if (res.data && res.data.items.length > 0) {
                setData(res.data.items)
            } else {
                setError("No results found")
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="App">
            {error && <p>{error}</p>}
            <Table config={config} data={data} />
        </div>
    )
}

export default App;
