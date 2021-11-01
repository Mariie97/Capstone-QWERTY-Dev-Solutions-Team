import React, {Component, createRef} from 'react';
import '../Layouts/AdministrationPage.css'
import {categories, getJobStatus, mapAccount} from "../Utilities";
import {Link} from "react-router-dom";
import ItemsDropdown from "./ItemsDropdown";
import {Box, CircularProgress} from "@material-ui/core";


class AdministrationPage extends Component {
    entity = {
        users: 1,
        jobs: 2
    }

    constructor(props) {
        super(props);
        this.state={
            entitiesLoaded: false,
            entities: [],
            typeRef: createRef(),
            deletedRef: createRef(),
            jobStatusRef: createRef(),
            jobCategoryRef: createRef(),
            currentEntity: this.entity.users,
        };

        this.renderUsers = this.renderUsers.bind(this);
        this.renderJobs = this.renderJobs.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getAllJobs = this.getAllJobs.bind(this);
    }

    getAllUsers() {
        const { deletedRef, typeRef } = this.state;
        let filters = '';

        if (typeRef.current?.state.item !== undefined && typeRef.current?.state.item !== '') {
            filters = `?account_type=${typeRef.current?.state.item}`;
        }
        if (deletedRef.current?.state.item === '2') {
            filters = filters !== '' ? filters + `&deleted=true` : `?deleted=true}`
        }

        fetch(`/users${filters}`).then(
            response => {
                if (response.status===200){
                    response.json().then(data => {
                        this.setState({
                            entities: data,
                            entitiesLoaded: true,
                        });
                    })
                }
                else if(response.status === 404 ) {
                    this.setState({
                        entities: [],
                        entitiesLoaded: true,
                    });
                }
            }
        )
    }

    getAllJobs() {
        //TODO: Add credentials
        fetch('/jobs_list/1').then(response => {
            if(response.status===200) {
                response.json().then(data =>  {
                    this.setState({
                        entities: data,
                        entitiesLoaded: true,
                    });
                })
            }
        })
    }

    componentDidMount() {
        this.getAllUsers();
    }

    renderUsers() {
        const { entities } = this.state;
        return entities.map((user, index) => (
            <tr key={`user-${user.user_id}`} className='admin-row-table'>
                <td className='admin-col-table admin-number-col'>{index+1}</td>
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

    renderJobs() {
        const { entities } = this.state;
        return entities.map((entity, index )=> (

            <tr key={`job-${entity.job_id}`} className='admin-row-table'>
                <td className='admin-col-table admin-number-col'>{index+1}</td>
                <td className='admin-col-table'>
                    <Link to={`/job/${entity.job_id}`} className='admin-table-row-link'>
                        {entity.title}
                    </Link>
                </td>
                <td className='admin-col-table'>{`${entity.owner_first} ${entity.owner_last}`}</td>
                <td className='admin-col-table'>{entity.date_posted} </td>
                <td className='admin-col-table'>{entity.categories} </td>
            </tr>
        ))
    }

    render() {
        const { deletedRef, typeRef, entitiesLoaded, currentEntity, jobStatusRef, jobCategoryRef} = this.state;
        return (
            <div>
                <h1 className="page-title-header">Administration Site</h1>
                <div className = "administration-body-container">
                    <div className="list-categories-container">
                        <h2 className="admin-entities-header">Entities</h2>
                        <div className="admin-entities-container">
                            <ul
                            className="list-categories-text"
                            onClick={() => {
                                this.setState({
                                    currentEntity: this.entity.users,
                                    entitiesLoaded: false,
                                });
                                this.getAllUsers();
                            }}
                        >Users</ul>
                        <ul
                            className="list-categories-text"
                            onClick={() => {
                                this.setState({
                                    currentEntity: this.entity.jobs,
                                    entitiesLoaded: false
                                });
                                this.getAllJobs();
                            }}
                        >Jobs</ul>
                        </div>

                    </div>
                    <div className="administration-table-container">
                        {!entitiesLoaded ?
                            <div className='loading-icon'>
                                <Box sx={{display: 'flex'}}>
                                    <CircularProgress />
                                </Box>
                            </div>:
                            <table className='admin-table-content'>
                                <thead>
                                {currentEntity===this.entity.users ?
                                    <tr className='admin-row-table' id="header-row-table">
                                        <th className='admin-col-table header-col-table admin-number-col'/>
                                        <th className='admin-col-table header-col-table'>Name</th>
                                        <th className='admin-col-table header-col-table'>Email</th>
                                        <th className='admin-col-table header-col-table'>Account Type</th>
                                    </tr> :
                                    <tr className='admin-row-table' id="header-row-table">
                                        <th className='admin-col-table header-col-table admin-number-col'/>
                                        <th className='admin-col-table header-col-table'>Title</th>
                                        <th className='admin-col-table header-col-table'>Owner</th>
                                        <th className='admin-col-table header-col-table'>Date Posted</th>
                                        <th className='admin-col-table header-col-table'>Category</th>
                                    </tr>
                                }
                                </thead>
                                <tbody>
                                {currentEntity === this.entity.users ? this.renderUsers() : this.renderJobs()}
                                </tbody>
                            </table>
                        }
                    </div>
                    <div className='administration-filter-container'>
                        {currentEntity === this.entity.users ?
                            <div className='administration-filter-dropdowns'>
                                <ItemsDropdown
                                    label={'Account Type'}
                                    ref={typeRef}
                                    itemsList={Object.values(mapAccount)}
                                />
                                <ItemsDropdown
                                    id='admin-user-deleted-dropdown'
                                    initial_value='1'
                                    label='Status'
                                    ref={deletedRef}
                                    itemsList={['Active', 'Deleted']}
                                />
                            </div> :
                            <div className='administration-filter-dropdowns'>
                                <ItemsDropdown
                                    id='admin-job-status-dropdown'
                                    label='Status'
                                    initial_value='1'
                                    ref={jobStatusRef}
                                    itemsList={getJobStatus}
                                />
                                <ItemsDropdown
                                    id='admin-job-categories-dropdown'
                                    label='Category'
                                    ref={jobCategoryRef}
                                    itemsList={categories}
                                />
                            </div>
                        }
                        <button
                            className='custom-buttons filter admin-filter-button'
                            onClick={() => {
                                this.setState({entitiesLoaded: false});
                                this.getAllUsers();
                            }}>Filter
                        </button>
                        <button
                            className='custom-buttons filter admin-filter-button'
                            onClick={() => {
                                if(currentEntity===this.entity.users) {

                                }
                            }}>Clear Filters
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdministrationPage;