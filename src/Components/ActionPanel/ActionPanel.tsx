import {ChangeEvent, FunctionComponent, useEffect, useState} from 'react';
import './ActionPanel.scss'
import moment from "moment";

interface ActionPanelType {
    fetchData: (start?: string, end?: string, association?: string) => any;
    setIsLoaded: (isLoaded: boolean) => any;
}

interface FormValues {
    association: string,
    start: string,
    end: string
}

//set a current date
const currentDate = new Date()
//set a current date then increase day by 7
const oneWeekDate = new Date()
oneWeekDate.setDate(currentDate.getDate() + 7)

const baseFormValues: FormValues = {
    association: '18bad24aaa',
    start: moment(currentDate).format('YYYY-MM-DD'),
    end: moment(oneWeekDate).format('YYYY-MM-DD')
}

//this component handles all actions on the form and initial page loading
const ActionPanel: FunctionComponent<ActionPanelType> = ({fetchData, setIsLoaded}) => {
    //one state element of all form values to allow for one onChange function to simplify code base and size
    const [formValues, setFormValues] = useState(baseFormValues)

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {id, value} = e.target

        setFormValues({
            ...formValues,
            [id]: value
        })
    }

    const fetchSubmit = () => {
        const {start, end, association} = formValues
        fetchData(start, end, association)
    }

    useEffect(() => {
        setIsLoaded(false)
        fetchSubmit()
    }, [])

    return (
        <>
            <div className="action-panel">
                <div className="action-panel-item">
                    <label htmlFor="association">State Association</label>
                    <select onChange={onChange} id="association" value={formValues['association']}>
                        <option value="18bad24aaa">GHSA</option>
                        <option value="542bc38f95">UIL</option>
                    </select>
                </div>
                <div className="action-panel-item">
                    <label htmlFor="start">Start Date</label>
                    <input type="date" id="start" onChange={onChange} value={formValues['start']} />
                </div>
                <div className="action-panel-item">
                    <label htmlFor="end">End Date</label>
                    <input type="date" id="end" onChange={onChange} value={formValues['end']} />
                </div>
            </div>
            <input type="button" value="Submit" className="action-submit" onClick={fetchSubmit} />
        </>
    );
};

export default ActionPanel;
