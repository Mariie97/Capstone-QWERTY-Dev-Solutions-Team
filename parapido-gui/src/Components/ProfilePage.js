import React, {Component, createRef} from 'react'
import "../Layouts/ProfilePage.css"
import {Link, Redirect} from 'react-router-dom';
import verifyUserAuth, {accountType, cities, current_user} from "../Utilities";
import Input from "./Input";
import CitiesDropdown from "./CitiesDropdown";
import {Box, CircularProgress} from "@material-ui/core";
import ProfileCard from './ProfileCard';


class ProfilePage extends Component {

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
            cityError: undefined,
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
                    console.log(e);
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
            firstNameError,
            lastNameError,
            streetError,
            zipcodeError,
            cityError,
            is_auth,
            pageLoaded,
            user,
        } = this.state;

        const {user_id} = this.props;
        const showButtons = parseInt(user_id) === current_user.id || current_user.type===accountType.admin;

        return (
            <React.Fragment>
                {!is_auth && <Redirect to='/' />}

                {!pageLoaded ?
                    <div className='loading-icon'>
                        <Box sx={{display: 'flex'}}>
                            <CircularProgress />
                        </Box>
                    </div>:
                    <div>
                        <div className="button-profile-page-flex-container">
                            {showButtons &&
                            <div className='button-container'>
                                {user.type !== accountType.admin &&
                                    <Link to={"/jobdashboard"}>
                                        <button className="button-profile-page" onClick={this.toggleEdit}>
                                            {current_user.type === accountType.admin ? 'User Jobs' : 'My Jobs'}
                                        </button>
                                    </Link>
                                }
                                <button className="button-profile-page" onClick={this.toggleEdit} >
                                    {edit? 'Cancel Edit' : 'Edit Profile'}
                                </button>
                                {current_user.type === accountType.admin &&
                                <button className="button-profile-page button-delete" onClick={this.onClickDelete}>
                                    Delete
                                </button>
                                }
                            </div>
                            }
                        </div>
                        <h1 className="profile-page-header">{first_name} {last_name} </h1>
                        <div className = "parent-flex-container-profile-page">
                            <div className="child1-flex-container-profile-page">
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
                                <div className="child2-flex-container-profile-page" style={{width: 800, marginLeft: 114}}>
                                    <ul className="bullet-removal-profile-page">
                                        <li>
                                            <ul className="body-flex-profile-page">
                                                <li className="child1-body-flex-profile-page"> Email:</li>
                                                <li className="break-text-profile-page"
                                                    style={{paddingTop: 19, paddingLeft: 18}}> {email} </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul className="body-flex-profile-page">
                                                <li className="child2-body-flex-profile-page"> Address:</li>
                                                {street!==null &&
                                                <li className="break-text-profile-page"
                                                    style={{paddingLeft: 3, paddingTop: 21}}> {street} {cities[city - 1]} PR, {zipcode}
                                                </li>
                                                }
                                            </ul>
                                        </li>
                                        <ul className="body-flex-profile-page">
                                            <li className="child1-body-flex-profile-page">About:</li>
                                            <p className="break-text-profile-page"
                                               style={{paddingLeft: 14, paddingTop: 19.5}}> {about} </p>
                                        </ul>
                                    </ul>
                                </div>:
                                <div className = "child2-grid-container">
                                    <div className="edit-info-grid-container">
                                        <div className="grid-edit-info-item7">
                                            <h2 className="edit-subheaders">Personal information</h2>
                                        </div>
                                        <div className="grid-edit-info-item1">
                                            <label className="label-about-profile-page"> First Name* </label>
                                            <Input
                                                required
                                                value={change_first_name}
                                                id="change-first-name"
                                                onChange={(event) => {
                                                    if (event.target.value.length <= 15 ) {
                                                        this.setState({
                                                            change_first_name: event.target.value
                                                        });
                                                    }
                                                }}
                                                onBlur={this.validateFirstName}
                                                error={firstNameError!==undefined}
                                                helperText={firstNameError}
                                            />
                                        </div>
                                        <div className="grid-edit-info-item2">
                                            <label className="label-about-profile-page"> Last Name* </label>
                                            <Input
                                                required
                                                value={change_last_name}
                                                id="change-last-name"
                                                onChange={(event) => {
                                                    if (event.target.value.length <= 15 ) {
                                                        this.setState({
                                                            change_last_name: event.target.value
                                                        });
                                                    }
                                                }}
                                                onBlur={this.validateLastName}
                                                error={lastNameError!==undefined}
                                                helperText={lastNameError}
                                            />
                                        </div>
                                        <div className="grid-edit-info-item3">
                                            <label className="label-about-profile-page"> About </label>
                                            <Input
                                                id="change-about"
                                                multiline={true}
                                                rows={6}
                                                value={change_about}
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
                                            <h2 className="edit-subheaders"> Address</h2>
                                        </div>
                                        <div className="grid-edit-info-item4">
                                            <label className="label-about-profile-page"> Street </label>
                                            <Input
                                                value={change_street}
                                                id="change-street-address"
                                                onChange={(event) => {
                                                    if (event.target.value.length <= 30 ) {
                                                        this.setState({
                                                            change_street: event.target.value
                                                        });
                                                    }}
                                                }
                                                onBlur={this.validateStreet}
                                                error={streetError!==undefined}
                                                helperText={streetError}
                                            />
                                        </div>
                                        <div className="grid-edit-info-item5">
                                            <CitiesDropdown
                                                initial_value={city}
                                                ref={change_city}
                                            />
                                            {cityError!==undefined &&
                                            <p className='citi-field-error'>{cityError}</p>
                                            }

                                        </div>
                                        <div className="grid-edit-info-item6">
                                            <label className="label-about-profile-page"> Zipcode </label>
                                            <Input
                                                value={change_zipcode}
                                                id="change-zipcode-address"
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
                                                helperText={zipcodeError}
                                            />
                                            <label id="profile-pic-label">Profile picture</label>
                                            <input
                                                id="profile-pic"
                                                type="file"
                                                name="file"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    this.setState({
                                                        change_image: event.target.files[0]
                                                    });}
                                                }
                                            />
                                        </div>
                                    </div>
                                    <button className="button-profile-page save-change-button" onClick={this.saveChanges} > Save changes </button>
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
                alert(`Can't delete user at this moment`)
            }
            //    TODO: Redirect to admin users list
        })
    }

    toggleEdit() {
        const {edit, change_city, user} = this.state;
        if(!edit) {
            change_city.current?.changeCity(user.city.toString());
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

    validateFirstName(event){
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

    validateLastName(event){
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

    validateStreet(event){
        const { change_street, change_zipcode} = this.state;
        if (change_street.length===0 && change_zipcode.length>0) {
            this.setState({
                streetError: "This field has to be completed"
            })
            return false;
        }
        this.setState({
            streetError: undefined
        })
        return true;
    }

    validateZipcode(event){
        const { change_street, change_zipcode} = this.state;

        if (change_zipcode.length===0 && change_street.length>0) {
            this.setState({
                zipcodeError: "This field has to be completed"
            })
            return false;
        }

        if (change_zipcode!=='' && change_zipcode.length<5) {
            this.setState({
                zipcodeError: "Zipcode format #####"
            });
            return false;
        }
        this.setState({
            zipcodeError: undefined,
        })
        return true;
    }

    validateCity() {
        const { change_city, change_zipcode, change_street, cityError } = this.state;
        if ((change_zipcode.length>0 || change_street.length>0) && change_city?.current.state.city===null) {
            this.setState({cityError: 'Select a city'});
            return false

        }
        this.setState({cityError: undefined});
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
            city = this.state.change_city?.current.state.city;
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

