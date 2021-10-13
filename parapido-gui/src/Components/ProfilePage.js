import React, {Component, createRef} from 'react'
import ProfileCard from './ProfileCard'
import "../Layouts/ProfilePage.css";
import { Link } from 'react-router-dom';
import Input from './Input';
import CitiesDropdown from "./CitiesDropdown";


export class Profile extends Component {
    current_user = localStorage.getItem('user_id');
    current_user_type = localStorage.getItem('type');


    constructor(props){
        super(props);

        this.state = {
            user : {
                first_name : 'Jane',
                last_name : 'Doe',
                email : 'jane.doe1000@upr.edu',
                about : ' I am the best!!!!',
                type  :' 1 ',
                image : ' ',
                jobs_cancelled : ' 50 ',
                rating_value : ' 3.5 ',
            },

            edit: true,
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
        };

        this.toggleEdit = this.toggleEdit.bind(this);

        this.validateFirstName = this.validateFirstName.bind(this);
        this.validateLastName = this.validateLastName.bind(this);
        this.validateStreet = this.validateStreet.bind(this);
        this.validateZipcode = this.validateZipcode.bind(this);

        this.saveChanges = this.saveChanges.bind(this);
    }

    componentDidMount(){
        // webpage background color
        document.body.style.backgroundColor = "#2F2D4A";


        // get from the server the specific user -
        // hasn't been implemented by the Back-End
    }

    toggleEdit() {
        this.setState(prevState => {
            return {
                ...prevState,
                edit: !prevState.edit
            };
        })
    }

    render() {
        const { user_id } = this.props
        const {first_name,
            last_name,
            email,
            about,
            type,
            image,
            jobs_cancelled,
            rating_value} = this.state.user;
        const {
            edit,
            change_about,
            change_first_name,
            change_last_name,
            change_image,
            change_city,
            change_zipcode,
            change_street,
            firstNameError,
            lastNameError,
            streetError,
            zipcodeError,} = this.state;

        return (

            <React.Fragment>
                <div className="child3-flex-container">
                    <Link to={"/jobdashboard"} className="button" style={{margin: 20}}> My Jobs</Link>
                    {user_id === this.current_user || this.current_user_type==='3' &&
                    <div className="button" onClick={this.toggleEdit} > {edit? 'Edit Profile': 'Cancel Edit'} </div>
                    }
                </div>

                <h1 className="profile-header">{first_name} {last_name} </h1>

                <div className = "parent-flex-container">

                    <div className="child1-flex-container"><ProfileCard /></div>
                    {edit ?
                        <div className = "child2-flex-container" style={{width: 800, marginLeft: 114}}>
                            <ul className = "bullet-removal">
                                <li>
                                    <ul className="body-flex">
                                        <li className= "child-body-flex">Name: </li>
                                        <li className="break-text" style={{paddingTop: 1, paddingLeft: 14}}>Jane Doe </li>
                                    </ul>

                                </li>

                                <li>
                                    <ul className="body-flex">
                                        <li  className= "child1-body-flex"> E-mail: </li>
                                        <li className="break-text" style={{paddingTop: 1, paddingLeft: 10}}> jnedoe@stephanierocks.com </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul className="body-flex">
                                        <li className= "child2-body-flex" > Address: </li>
                                        <li className="break-text" style={{paddingTop: 2}}> Street Steph Ponce 00680 </li>
                                    </ul>

                                </li>
                                <ul className="body-flex">
                                    <li className= "child1-body-flex">About:</li>
                                    <p className="break-text" style={{paddingLeft: 17 , paddingTop: 2.5}} >I am a really hard working person and am interested in working cleaning different things like plates and stuff.
                                    </p>
                                </ul>

                            </ul>
                        </div> :
                        <div className = "child2-grid-container">
                            <div className="edit-info-grid-container">
                                <div className="grid-edit-info-item7">
                                    <h2 className="edit-subheaders">Personal information</h2>
                                </div>
                                <div className="grid-edit-info-item1">
                                    <Input
                                        required
                                        label="First Name"
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
                                    <Input
                                        required
                                        label="Last Name"
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
                                    <Input
                                        id="change-about"
                                        label="About"
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
                                    <Input
                                        label="Street"
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
                                        ref={change_city}
                                    />

                                </div>
                                <div className="grid-edit-info-item6">
                                    <Input
                                        label="Zipcode"
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
                            <button className="button save-change-button" onClick={this.saveChanges} > Save changes </button>
                        </div>
                    }
                </div>

            </React.Fragment>
        )
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

    saveChanges() {

        const val1= this.validateLastName();
        const val2= this.validateFirstName();
        const val3= this.validateStreet();
        const val4= this.validateZipcode();
        if (!val1 || !val2 || !val3 || !val4) {
            return false;
        }

        let city = '';
        if(this.state.change_zipcode!=='' || this.state.change_street!=='') {
            city = this.state.change_city?.current.state.city;
        }

        const data = new FormData();

        // data.append("user_id", '270');
        data.append("first_name", this.state.change_first_name);
        data.append("last_name", this.state.change_last_name);
        data.append("image", this.state.change_image);
        data.append("about", this.state.change_about);
        data.append("street", this.state.change_street);
        data.append("zipcode", this.state.change_zipcode);
        data.append("city", city);
        // Get id from props
        fetch('/edit_user/'+'<user_id>', {
            method: 'PUT',
            body: data,
        }).then(response => {
            if (response.status!==200) {
                alert("Error");
            }
            else {
                this.toggleEdit();
                this.setState({
                    change_about: '',
                    change_first_name: '',
                    change_last_name: '',
                    change_image: '',
                    change_city: '',
                    change_zipcode: '',
                    change_street: '',
                });
            }

        });
        return true;
    }

}



export default Profile;

