import React from 'react'
import { Card } from 'react-bootstrap';
import { CardBody } from 'reactstrap';
import SearchComponent from '../Components/SearchComponent ';
import PartyListTable from './PartyListTable';
export default function Party() {
    return (
        <div>
            <div className='container'>
            <h5 className="pageHead" >Manage Party User</h5>
                <Card style={{ backgroundColor: "#F8F8F8" }} >
                    <CardBody>
                        <SearchComponent />
                        <hr/>
                        <PartyListTable />
                    </CardBody>
                </Card>

            </div>
        </div>
    )
}
