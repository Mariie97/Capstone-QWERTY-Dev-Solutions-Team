import React, {Component, createRef} from 'react';
import '../Layouts/AdministrationPage.css'
import {accountType, mapAccount} from "../Utilities";
import {Link} from "react-router-dom";
import ItemsDropdown from "./ItemsDropdown";


class AdministrationPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            pageLoaded: false,
            users: [],
            typeRef: createRef(),
            deletedRef: createRef(),
        };

        this.renderUsers = this.renderUsers.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    getAllUsers() {
        fetch(`/users?account_type=${1}`).then(
            response => {
                if (response.status===200){
                    response.json().then(data => {
                        this.setState({users: data });
                    })
                }
            }
        )

    }

    componentDidMount() {
        this.getAllUsers();
    }

    renderUsers() {
        const { users } = this.state;
        return users.map(user => (
            <tr key={`user-${user.user_id}`} className='admin-row-table'>

                <td className='admin-col-table'>
                    <Link to={`/profile/${user.user_id}`} className='admin-table-row-link'>
                        {user.first_name} {user.last_name}
                    </Link>
                </td>
                <td className='admin-col-table'>{user.email} </td>
                <td className='admin-col-table'>{mapAccount[user.type]} </td>

            </tr>
        ))
    }

    clearFilters() {
        const { deletedRef, typeRef } = this.state;
        deletedRef.current?.reset();
        typeRef.current?.reset();
    }

    render() {
        const { deletedRef, typeRef } = this.state;
        return (
            <div>
                <h1 className="page-title-header">Administration Site</h1>
                <div className = "administration-body-container">
                    <div className="list-categories-container">
                        <h3 className="list-categories-text">Students</h3>
                        <h3 className="list-categories-text">Jobs</h3>
                    </div>
                    <div className="administration-table-container">
                        <table className='admin-table-content'>
                            <thead>
                            <tr className='admin-row-table' id="header-row-table">
                                <th className='admin-col-table header-col-table'>Name</th>
                                <th className='admin-col-table header-col-table'>Email </th>
                                <th className='admin-col-table header-col-table'>Account Type </th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderUsers()}
                            </tbody>
                        </table>
                    </div>
                    <div className='administration-filter-container'>
                        <ItemsDropdown
                            label='Account Type'
                            ref={typeRef}
                            itemsList={Object.keys(accountType)}
                        />
                        <ItemsDropdown
                            initial_value='1'
                            label='Status'
                            ref={deletedRef}
                            itemsList={['Active', 'Deleted']}
                        />

                        <button className='custom-buttons filter admin-filter-button'>Filter</button>
                        <button className='custom-buttons filter admin-filter-button' onClick={this.clearFilters}>Clear Filters</button>

                    </div>
                </div>
            </div>
        )
    }
}

export default AdministrationPage;