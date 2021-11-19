import React, {Component, createRef} from "react";
import {Link, Redirect} from "react-router-dom";
import {categories, getJobStatus, mapAccount, verifyUserAuth, accountType} from "../Utilities";
import ItemsDropdown from "./ItemsDropdown";
import {Box, CircularProgress} from "@material-ui/core";
import ErrorPage from './ErrorPage';
import Alert from "@material-ui/lab/Alert";

class AdministrationPage extends Component {
    currentUser = {
        id: parseInt(localStorage.getItem('user_id')),
        type: parseInt(localStorage.getItem('type'))
    };
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
            is_auth: true,
            is_admin: this.currentUser.type === accountType.admin,
            alert: {
                msg: undefined,
                severity: undefined
            }
        };

        this.renderUsers = this.renderUsers.bind(this);
        this.renderJobs = this.renderJobs.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getAllJobs = this.getAllJobs.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
    }

    getAllUsers() {
        const { deletedRef, typeRef } = this.state;
        let filters = {};
        let queryParams = '';

        if (typeRef.current?.state.item !== undefined && typeRef.current?.state.item !== '') {
            filters.account_type = typeRef.current?.state.item;
        }
        if (deletedRef.current?.state.item === '2') {
            filters.deleted = 'true';
        }

        if (Object.keys(filters).length>0) {
            queryParams = `?${new URLSearchParams(filters)}`;
        }

        fetch(`/users/${queryParams}`, {
            method: "GET",
            credentials: 'same-origin',
            headers: {
                'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
            },
        }).then(response => {
            if(response.status===200) {
                response.json().then(data =>  {
                    this.setState({
                        entities: data,
                        entitiesLoaded: true,
                    });
                })
            }
            else {
                if (response.status === 404) {
                    this.setState({
                        entities: [],
                        entitiesLoaded: true,
                    });
                }
                else {
                    alert("Sorry an error has occurred. Try again later");
                }
            }
        })
    }

    getAllJobs() {
        const { jobStatusRef, jobCategoryRef } = this.state;
        const jobStatus = jobStatusRef.current?.state.item !== undefined ? jobStatusRef.current?.state.item : 1;
        let filters = {};
        let queryParams = '';

        if (jobCategoryRef.current?.state.item !== undefined && jobCategoryRef.current?.state.item !== '') {
            filters.category = jobCategoryRef.current?.state.item;
        }
        if (Object.keys(filters).length>0) {
            queryParams = `?${new URLSearchParams(filters)}`;
        }

        fetch(`/jobs_list/${jobStatus+queryParams}`, {
            method: "GET",
            credentials: 'same-origin',
            headers: {
                'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
            },
        }).then(response => {
            if(response.status===200) {
                response.json().then(data =>  {
                    this.setState({
                        entities: data,
                        entitiesLoaded: true,
                    });
                })
            }
            else {
                if (response.status === 404) {
                    this.setState({
                        entities: [],
                        entitiesLoaded: true,
                    });
                }
                else {
                    alert("Sorry an error has occurred. Try again later");
                }
            }
        })
    }

    clearFilters() {
        const { deletedRef, typeRef, jobStatusRef, jobCategoryRef} = this.state;
        deletedRef.current?.reset();
        typeRef.current?.reset();
        jobStatusRef.current?.reset();
        jobCategoryRef.current?.reset();
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#2F2D4A"

        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });

        this.getAllUsers();
        if(this.props.history.action === 'POP') {
            this.setState({
                alert: {msg: undefined}
            });
        }
        else {
            this.setState({
                alert: {
                    msg: this.props.location.state?.alertMssg,
                    severity: this.props.location.state?.severity
                }
            });
        }
    }

    renderUsers() {
        const { entities } = this.state;
        return entities.map((user, index) => (
            <tr key={`user-${user.user_id}`} className='admin-row-table'>
                <td className='admin-col-table admin-number-col'>{index+1}</td>
                <td className='admin-col-table'>
                    <Link to={`/profile/${user.user_id}`} id='small-urls' className='admin-table-row-link'>
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

    hideAlert() {
        setTimeout(() => {this.setState({
            alert: {msg: undefined}})}, 3000);
    }


    render() {
        const { is_auth, deletedRef, typeRef, entitiesLoaded, currentEntity, jobStatusRef, jobCategoryRef, is_admin, alert} = this.state;
        return (
            <div>
                {!is_auth && <Redirect to='/' />}
                {!is_admin ? <ErrorPage errorNumber="403" errorType="Forbidden/Access Not Allowed"/> :
                    <React.Fragment>
                        {alert.msg !== undefined &&
                        <Alert onLoad={this.hideAlert()} severity={alert.severity} className="server-error-job-creation">
                            {alert.msg}
                        </Alert>
                        }
                        <h1 className="page-title-header" style={{width:"750px", paddingBottom: "0px", marginBottom:"0px"}}>
                            Administration Site: {currentEntity===this.entity.users? 'Users' : 'Jobs'}
                        </h1>
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
                                            this.clearFilters();
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
                                            this.clearFilters();
                                            this.getAllJobs();
                                        }}
                                    >Jobs</ul>
                                </div>
                                <h2 className="admin-entities-header">Filters</h2>
                                <div className='administration-filter-container'>
                                    {currentEntity === this.entity.users ?
                                        <div className='administration-filter-dropdowns'>
                                            <ItemsDropdown
                                                removeDefault
                                                blackLabel
                                                id='admin-user-type-dropdown'
                                                label={'Account Type'}
                                                ref={typeRef}
                                                itemsList={Object.values(mapAccount)}
                                            />
                                            <ItemsDropdown
                                                removeDefault
                                                blackLabel
                                                id='admin-user-deleted-dropdown'
                                                initial_value='1'
                                                label='Status'
                                                ref={deletedRef}
                                                itemsList={['Active', 'Deleted']}
                                            />
                                        </div> :
                                        <div className='administration-filter-dropdowns'>
                                            <ItemsDropdown
                                                removeDefault
                                                blackLabel
                                                id='admin-job-categories-dropdown'
                                                label='Category'
                                                ref={jobCategoryRef}
                                                itemsList={categories}
                                            />
                                            <ItemsDropdown
                                                removeDefault
                                                blackLabel
                                                id='admin-job-status-dropdown'
                                                label='Status'
                                                initial_value='1'
                                                ref={jobStatusRef}
                                                itemsList={getJobStatus}
                                            />
                                        </div>
                                    }
                                    <div className="admin-filter-button-container">
                                        <button
                                            className='custom-buttons filter admin-filter-button'
                                            onClick={() => {
                                                this.setState({entitiesLoaded: false});
                                                if (currentEntity === this.entity.users)
                                                    this.getAllUsers();
                                                else
                                                    this.getAllJobs();
                                            }}>Filter
                                        </button>
                                        <button
                                            className='custom-buttons filter admin-filter-button'
                                            onClick={this.clearFilters}>Clear Filters
                                        </button>
                                    </div>
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
                        </div>
                    </React.Fragment>}
            </div>
        )
    }
}

export default AdministrationPage;