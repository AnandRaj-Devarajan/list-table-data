import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

function ListTable() {

    const [tableData, settableData] = useState([])
    const [option, setoption] = useState([])

    const getOption = (data) => {
        const uniqueId = { 'All': '' }
        data.map(e => {
            return uniqueId[e.status] = e.status
        })
        return Object.keys(uniqueId)
    }
    useEffect(() => {
        axios.get("http://timeapi.kaaylabs.com/api/v1/project_view/")
            .then(response => {
                setoption(getOption(response.data.data))
                settableData(response.data.data.map(el => {
                    el.show = true;
                    return el;
                }))
            })
            .catch(error => console.log(error))

    }, [])

    const selected = (ev) => {
        const value = ev.target.value
        settableData(tableData.map(q => {
            q.show = value === 'All' || q.status === value;
            return q;
        }))
    }
    return (
        <div>
            <select id='status' onChange={selected}>
                {option.map(e => <option value={e}>{e}</option>)}
            </select>

            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Description</th>
                            <th>start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {tableData.filter(e => e.show).map((e) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{e.company_name}</td>
                                    <td>{e.description}</td>
                                    <td>{e.start_date}</td>
                                    <td>{e.end_date}</td>
                                    <td>{e.status}</td>

                                </tr>
                            </tbody>)
                    }
                    )}
                </Table>
            </div>
        </div>
    )
}

export default ListTable;
