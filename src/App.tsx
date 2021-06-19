import React, {useState} from 'react';
import './App.scss';
import Table from "./Components/Table/Table";
import axios, {AxiosResponse} from "axios";
import {Config} from "./Components/Table/types";
import moment from "moment";
import ActionPanel from "./Components/ActionPanel/ActionPanel";
import Loader from "./Components/Loader/Loader";

interface PlayonData {
    items: PlayonItems[]
}

interface PlayonItems {
    date: string;
    level: string;
    key: string;
    sport: string;
    headline: string;
    subheadline: string;
}

interface Params {
    state_association_key: string;
    card: boolean;
    size: number;
    start: number;
    from?: string;
    to?: string;
}

//Custom basic table that when configured could accept any data
//this config sets up the table to know how to built itself using the data provided
const config: Config[] = [
    {
        header: 'Key',
        key: 'key'
    },
    {
        header: 'Headline',
        key: 'headline',
        Cell: (data) => <span>{data}</span>
    },
    {
        header: 'SubHeadline',
        key: 'subheadline',
        Cell: (data) => <span>{data}</span>
    },
    {
        header: 'Start Time',
        key: 'date',
        Cell: (data: string) => {
            const date = moment(data).format('MMMM Do YYYY h:mm a')

            return <span>{date}</span>
        }
    }
]

function App() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState<PlayonItems[]>([])
    const [error, setError] = useState("")

    //function to handle all data calls and set appropriate state elements
    const fetchData = (start?: string, end?: string, association?: string) => {
        const url = 'https://search-api.nfhsnetwork.com/v2/search/events/upcoming'
        let params: Params = {
            state_association_key: association ? association : '18bad24aaa',
            card: true,
            size: 50,
            start: 0
        }

        if (start && end) {
            params = {
                ...params,
                from: moment(start).format('YYYY-MM-DDTHH:mm:ss[Z]'),
                to: moment(end).set({'hour': 23, 'minute': 59, 'second': 59}).format('YYYY-MM-DDTHH:mm:ss[Z]')
            }
        }

        axios.get(url, {params}).then((res: AxiosResponse<PlayonData>) => {
            if (res.data && res.data.items.length > 0) {
                setData(res.data.items)
            } else {
                setError("No results found")
            }
            setIsLoaded(true)
        }).catch((err) => {
            if (err.response) {
                setError(err.response.statusText)
            } else {
                setError("An unknown error occurred please try again or contact an adminstrator")
            }
            setIsLoaded(true)
        })
    }

    return (
        <div className="App">
            {error && <p>{error}</p>}
            {!isLoaded && <Loader />}
            <ActionPanel fetchData={fetchData} setIsLoaded={setIsLoaded} />
            <Table config={config} data={data} className="playon-table" />
        </div>
    )
}

export default App;
