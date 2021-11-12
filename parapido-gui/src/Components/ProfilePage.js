import React, {Component, createRef} from 'react';
import "../Layouts/ProfilePage.css";
import {Link, Redirect} from 'react-router-dom';
import {accountType, cities, verifyUserAuth, zipcodeFormatPR} from "../Utilities";
import Input from "./Input";
import ItemsDropdown from "./ItemsDropdown";
import {Box, CircularProgress} from "@material-ui/core";
import ProfileCard from './ProfileCard';
import UploadIcon from '@material-ui/icons/CloudUpload'

class ProfilePage extends Component {
    currentUser = {
        id: parseInt(localStorage.getItem('user_id')),
        type: parseInt(localStorage.getItem('type'))
    };

    constructor(props){
        super(props);
        this.state = { user : {
                first_name : '',
                last_name : '',
                email : '',
                about : '',
                type  :'',
                image : '',
                jobs_cancelled : '',
                street: '',
                city: '',
                zipcode: '',
                rating_value : '',
            },
            pageLoaded: false,
            is_auth: true,
            edit: false,
            change_about: '',
            change_first_name : '',
            change_last_name : '',
            change_image : '',
            change_city: createRef(),
            change_zipcode: '',
            change_street: '',
            firstNameError: undefined,
            lastNameError: undefined,
            streetError: undefined,
            zipcodeError: undefined,
            redirect: undefined,
            alert: {
                msg: undefined,
                severity: 'success'
            }
        }

        this.toggleEdit = this.toggleEdit.bind(this);

        this.validateFirstName = this.validateFirstName.bind(this);
        this.validateLastName = this.validateLastName.bind(this);
        this.validateStreet = this.validateStreet.bind(this);
        this.validateZipcode = this.validateZipcode.bind(this);
        this.validateCity = this.validateCity.bind(this);

        this.saveChanges = this.saveChanges.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    componentDidMount(){
        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });
        // webpage background color
        document.body.style.backgroundColor = "#2F2D4A"

        fetch('/user_info/' + this.props.user_id, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
            }
        }).then(response => {
            if(response.status === 200) {
                response.json().then(data => {
                        this.setState({ user: {
                                first_name: data.first_name,
                                last_name: data.last_name,
                                email: data.email,
                                image: data.image,
                                type: data.type,
                                about: data.about,
                                jobs_cancelled: data.cancellations,
                                street: data.street,
                                city: data.city,
                                zipcode: data.zipcode,
                                rating_value: data.rate,
                            },
                            pageLoaded: true,
                        });
                    }
                ).catch((e) => {
                    throw(e);
                });
            }
        })
    }

    render() {
        const {first_name, last_name, email, about , street, city, zipcode} = this.state.user;
        const {
            edit,
            change_about,
            change_first_name,
            change_last_name,
            change_city,
            change_zipcode,
            change_street,
            change_image,
            firstNameError,
            lastNameError,
            streetError,
            zipcodeError,
            is_auth,
            pageLoaded,
            user,
            redirect,
            alert
        } = this.state;

        const {user_id} = this.props;
        const showButtons = parseInt(user_id) === this.currentUser.id || this.currentUser.type===accountType.admin;

        return (
            <React.Fragment>
                {!is_auth && <Redirect to='/' />}
                {redirect !== undefined && <Redirect to={{
                    pathname: redirect,
                    state: {
                        alertMssg: alert.msg,
                        severity: alert.severity
                    }
                }} />
                }
                {!pageLoaded ?
                    <div className='loading-icon'>
                        <Box sx={{display: 'flex'}}>
                            <CircularProgress />
                        </Box>
                    </div>:
                    <div>
                        <div className='header-flex-container'>
                            {showButtons &&
                            <div className="button-flex-container">
                                {user.type !== accountType.admin &&
                                <Link to={"/myjobs"}>
                                    <button className="custom-buttons" onClick={this.toggleEdit}>
                                        {this.currentUser.type === accountType.admin ? 'User Jobs' : 'My Jobs'}
                                    </button>
                                </Link>
                                }
                                <button className="custom-buttons" onClick={this.toggleEdit} >
                                    {edit? 'Cancel Edit' : 'Edit Profile'}
                                </button>
                                {this.currentUser.type === accountType.admin &&
                                <button className="custom-buttons delete-button" onClick={this.onClickDelete}>
                                    Delete
                                </button>
                                }
                            </div>
                            }
                            <h1 className="page-title-header">{first_name} {last_name}</h1>
                        </div>
                        <div className = "parent-table-body-container">
                            <div className="child1-flex-body-container">
                                <ProfileCard
                                    user_id={user_id}
                                    first_name={user.first_name}
                                    last_name={user.last_name}
                                    rating_value={user.rating_value}
                                    jobs_cancelled={user.jobs_cancelled}
                                    type={user.type}
                                    image={user.image}                                />
                            </div>
                            {!edit ?
                                <table className='table-body-content'>
                                    <tr className='row-table-body'>
                                        <td className='column-table-body col1'>Email:</td>
                                        <td className='column-table-body col2'>{email} </td>
                                    </tr>
                                    <tr className='row-table-body'>
                                        <td className='column-table-body col1'>Address:</td>
                                        <td className='column-table-body col2'>
                                            {street !== null &&
                                            `${street} ${cities[city - 1]} PR, ${zipcode}`
                                            }
                                        </td>
                                    </tr>
                                    <tr className='row-table-body'>
                                        <td className='column-table-body col1'>About:</td>
                                        <td className='column-table-body col2'>{about}</td>
                                    </tr>
                                </table>
                                :
                                <div className = "child2-grid-container">
                                    <div className="edit-info-grid-container">
                                        <div className="grid-edit-info-item7">
                                            <h2 className="edit-subheaders">Personal information</h2>
                                        </div>
                                        <div className="grid-edit-info-item1">
                                            <Input
                                                required
                                                value={change_first_name}
                                                className="change-name"
                                                onChange={(event) => {
                                                    if (event.target.value.length <= 15 ) {
                                                        this.setState({
                                                            change_first_name: event.target.value
                                                        });
                                                    }
                                                }}
                                                onBlur={this.validateFirstName}
                                                error={firstNameError!==undefined}
                                                errorMsg={firstNameError}
                                                labelText='First Name'
                                            />
                                        </div>
                                        <div className="grid-edit-info-item2">
                                            <Input
                                                required
                                                value={change_last_name}
                                                className="change-name"
                                                onChange={(event) => {
                                                    if (event.target.value.length <= 15 ) {
                                                        this.setState({
                                                            change_last_name: event.target.value
                                                        });
                                                    }
                                                }}
                                                onBlur={this.validateLastName}
                                                error={lastNameError!==undefined}
                                                errorMsg={lastNameError}
                                                labelText='Last Name'
                                            />
                                        </div>
                                        <div className="grid-edit-info-item3">
                                            <Input
                                                id="change-about"
                                                labelText='About'
                                                multiline
                                                rows='6'
                                                value={change_about}
                                                className="change-about-style-profile-page"
                                                onChange={(event) => {
                                                    if (event.target.value.length <= 250 ) {
                                                        this.setState({
                                                            change_about: event.target.value
                                                        });
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="grid-edit-info-item8">
                                            <h2 className="edit-subheaders">Address</h2>
                                        </div>
                                        <div className="grid-edit-info-item4">
                                            <Input
                                                value={change_street}
                                                className="change-street-address"
                                                onChange={(event) => {
                                                    if (event.target.value.length <= 30 ) {
                                                        this.setState({
                                                            change_street: event.target.value
                                                        });
                                                    }}
                                                }
                                                onBlur={this.validateStreet}
                                                error={streetError!==undefined}
                                                errorMsg={streetError}
                                                labelText='Street'
                                            />
                                        </div>
                                        <div className="grid-edit-info-item5">
                                            <ItemsDropdown
                                                label='City'
                                                initial_value={city}
                                                ref={change_city}
                                                validationFunc={this.validateCity}
                                                itemsList={cities}
                                            />
                                        </div>
                                        <div className="grid-edit-info-item6">
                                            <Input
                                                value={change_zipcode}
                                                className="change-zipcode-address"
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    if (value.length <= 5  && !isNaN(value)) {
                                                        this.setState({
                                                            change_zipcode: value
                                                        });
                                                    }
                                                }}
                                                onBlur={this.validateZipcode}
                                                error={zipcodeError!==undefined}
                                                errorMsg={zipcodeError}
                                                labelText='Zipcode'
                                            />
                                            <div className='upload-profile-pic-container'>
                                                <div className='upload-file-text'>
                                                    {change_image.name === undefined ? 'No file selected'  :
                                                        change_image.name
                                                    }
                                                </div>
                                                <label for="profile-pic" className="custom-file-upload-profile-page">
                                                    <UploadIcon /> Upload picture
                                                </label>
                                                <input
                                                    id="profile-pic"
                                                    type="file"
                                                    name="file"
                                                    accept="image/*"
                                                    style={{display:"none"}}
                                                    onChange={(event) => {
                                                        this.setState({
                                                            change_image: event.target.files[0]
                                                        });}
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="custom-buttons save-change-button" onClick={this.saveChanges} >
                                        Save changes
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }

    onClickDelete(){
        fetch('/delete_user/' + this.props.user_id, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
            }
        }).then(response =>{
            if (response.status!==200){
                this.setState({
                    alert: {
                        msg: "Can not delete user at this moment",
                        severity: "error"
                    },
                    redirect: '/admin/site'
                })

            }
            else {
                this.setState({
                    alert: {
                        msg: "User deleted successfully"},
                    redirect: '/admin/site'
                })
            }
        })
    }

    toggleEdit() {
        const {edit, change_city, user} = this.state;
        if(!edit) {
            change_city.current?.setState({item: user.city.toString()});
            this.setState(prevState => {
                return {
                    ...prevState,
                    change_about: prevState.user.about!==null ? prevState.user.about: '',
                    change_first_name: prevState.user.first_name,
                    change_last_name: prevState.user.last_name,
                    change_zipcode: prevState.user.zipcode!==null ? prevState.user.zipcode : '',
                    change_street: prevState.user.street !== null ? prevState.user.street : '',
                    edit: !prevState.edit
                };
            });
        }
        else {
            this.setState(prevState => {
                return {
                    ...prevState,
                    edit: !prevState.edit,
                    firstNameError: undefined,
                    lastNameError: undefined,
                    streetError: undefined,
                    zipcodeError: undefined,
                    cityError: undefined,
                };
            });
        }
    }

    validateFirstName(){
        if (this.state.change_first_name.length===0) {
            this.setState({
                firstNameError: "This field is required"
            })
            return false;
        }
        this.setState({
            firstNameError: undefined
        })

        return true;
    }

    validateLastName(){
        if (this.state.change_last_name.length===0) {
            this.setState({
                lastNameError: "This field is required"
            })
            return false;
        }
        this.setState({
            lastNameError: undefined
        })
        return true;
    }

    validateStreet(){
        const { change_city, change_street, change_zipcode, zipcodeError} = this.state;
        if (change_street.length===0 && change_zipcode.length>0) {
            this.setState({
                streetError: 'This field is required'
            })
            return false;
        }
        if (change_street==='' && zipcodeError!==undefined) {
            change_city.current.validate();
            this.setState({
                zipcodeError: undefined,
                streetError: undefined,
            });
        }
        else
            this.setState({ streetError: undefined});

        return true;
    }

    validateZipcode(){
        const { change_city, change_street, change_zipcode, streetError} = this.state;

        if (change_zipcode.length===0 && change_street.length>0) {
            this.setState({zipcodeError: 'This field is required'})
            return false;
        }
        if (change_zipcode!=='') {
            if (change_zipcode.length < 5) {
                this.setState({zipcodeError: "Zipcode format #####"});
                return false;
            }
            if (!zipcodeFormatPR.test(change_zipcode)) {
                this.setState({zipcodeError: 'Zipcode not from Puerto Rico'});
                return false;
            }
        }

        if (change_zipcode==='' && streetError!==undefined) {
            change_city.current.validate();
            this.setState({
                zipcodeError: undefined,
                streetError: undefined,
            });
        }
        else
            this.setState({zipcodeError: undefined });

        return true;
    }

    validateCity() {
        const { change_city, change_zipcode, change_street } = this.state;
        if ((change_zipcode.length > 0 || change_street.length > 0) && (change_city?.current.state.item===''
            || change_city?.current.state.item==='0')) {
            change_city?.current.setState({itemError: 'This field is required'});
            return false;
        }
        change_city?.current.setState({itemError: undefined});
        return true;
    }

    saveChanges() {
        const val1= this.validateLastName();
        const val2= this.validateFirstName();
        const val3= this.validateStreet();
        const val4= this.validateZipcode();
        const val5= this.validateCity();
        if (!val1 || !val2 || !val3 || !val4 || !val5) {
            return false;
        }

        let city = '';
        if(this.state.change_zipcode!=='' || this.state.change_street!=='') {
            city = this.state.change_city?.current.state.item;
        }

        const data = new FormData();

        data.append("first_name", this.state.change_first_name);
        data.append("last_name", this.state.change_last_name);
        data.append("image", this.state.change_image);
        data.append("about", this.state.change_about);
        data.append("street", this.state.change_street);
        data.append("zipcode", this.state.change_zipcode);
        data.append("city", city);

        fetch('/edit_user/' + this.props.user_id, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
            },
            body: data,
        }).then(response => {
            if (response.status!==200) {
                alert("Sorry we can not edit your information at this moment. Try again later");
            }
            else {
                window.location.reload();
            }
        });
    }
}

export default ProfilePage;

