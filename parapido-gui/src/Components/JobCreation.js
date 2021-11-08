import React, {Component, createRef} from 'react';
import {Redirect} from "react-router-dom";
import "../Layouts/JobCreation.css";
import ItemsDropdown from "./ItemsDropdown.js";
import AvailableDays from './AvailableDaysChips';
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import CreateIcon from '@material-ui/icons/Create';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import Alert from '@material-ui/lab/Alert';
import {categories, cities, verifyUserAuth, zipcodeFormatPR} from "../Utilities";

export class JobCreation extends Component {

    constructor(props){
        super(props);

        this.state = {
            title : '',
            street: '',
            description: '',
            zipcode: '',
            price: '',
            change_city: createRef(),
            change_category: createRef(),
            availableDays_chips: createRef(),
            titleError: undefined,
            streetError: undefined,
            descriptionError: undefined,
            zipcodeError: undefined,
            priceError: undefined,
            creationSuccessful: false,
            serverProcessedRequest: true,
            is_auth: true
        };

        // event methods - before render method
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);

        // validation methods - end of render method
        this.validateTitle = this.validateTitle.bind(this);
        this.validateStreet = this.validateStreet.bind(this);
        this.validateDescription = this.validateDescription.bind(this);
        this.validateZipcode = this.validateZipcode.bind(this);
        this.validatePrice = this.validatePrice.bind(this);
    }

    componentDidMount() {
        // webpage background color
        document.body.style.backgroundColor = "#2F2D4A";
        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });
    }

    handleChange(event){
        const {name, value} = event.target;
        if(name === "title" && value.length <= 50){
            this.setState({[name]:value});}
        else if(name === "street" && value.length <=30 ){this.setState({[name]:value});}
        else if(name === "description" && value.length <= 500){this.setState({[name]:value});}
        else if(name === "zipcode" && value.length <=5){this.setState({[name]:value});}
        else if(name === "price"){
            const format_price = value.replaceAll(',','')
            this.setState({[name]:format_price});}
    }

    handleCreateClick(){
        const validate1 = this.validateTitle();
        const validate2 = this.validateStreet();
        const validate3 = this.validateDescription();
        const validate4 = this.validateZipcode();
        const validate5 = this.validatePrice();
        const validate6 = this.state.change_city.current?.validate();
        const validate7 = this.state.change_category.current?.validate();
        
        if(!validate1 || !validate2 || !validate3 || !validate4 || !validate5 || !validate6 || !validate7){
            return false;
        }
       
        const { title, street, description, zipcode, price, change_city,
            change_category, availableDays_chips } = this.state
           
        const city = change_city?.current.state.item
        const category = change_category?.current.state.item
        const chips = availableDays_chips?.current.state.chipData

        const sunday    = chips.some(sun => sun.key === 0);
        const monday    = chips.some(mon => mon.key === 1);
        const tuesday   = chips.some(tue => tue.key === 2);
        const wednesday = chips.some(wed => wed.key === 3);
        const thursday  = chips.some(thu => thu.key === 4);
        const friday    = chips.some(fri => fri.key === 5);
        const saturday  = chips.some(sat => sat.key === 6);
  
        fetch('/create_job',{
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
            },
            body: JSON.stringify({
                user_id:  localStorage.getItem('user_id'),
                title: title,
                street: street,
                description: description,
                zipcode: zipcode,
                price: price,
                city: city,
                categories: category,
                d: sunday === true ? 1 : 0,
                l: monday === true ? 1 : 0,
                m: tuesday === true ? 1 : 0,
                w: wednesday === true ? 1 : 0,
                j: thursday === true ? 1 : 0,
                v: friday === true ? 1 : 0,
                s: saturday === true ? 1 : 0
            })
        }).then(response => {
                if(response.status === 201) {                  
                    this.setState({
                        creationSuccessful: true
                    })
                }
                else{
                    this.setState({
                        serverProcessedRequest: false
                    })
                }
            }
        )
    }
    render() {
        const { change_city,
            change_category,
            availableDays_chips,
            serverProcessedRequest,
            creationSuccessful,
            is_auth,
            titleError,
            descriptionError,
            streetError,
            zipcodeError,
            priceError,
            title,
            street,
            description,
            zipcode,
        } = this.state

        return (
            <React.Fragment>
                {!is_auth && <Redirect to='/' />}
                {creationSuccessful && <Redirect to="/jobdashboard" />}
                {!serverProcessedRequest && <Alert severity="error" className="server-error-job-creation">
                    Sorry can't create job right now 😔 please try again later!!!.
                </Alert>}
                <h1 className="job-creation-page-header"> Job Creation </h1>

                <div className="big-flexbox-for-2-flexbox-containers-job-creation">
                    <div className="left-body-container-1-job-creation">
                        <label className="label-job-creation"> Title* </label>
                        <input
                            className="input-1-job-creation"
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title"
                            value={title}
                            onChange={this.handleChange}
                            onBlur={this.validateTitle}
                        />
                        {titleError !== undefined &&
                        <div className="required-field-job-creation">
                            <ReportProblemIcon style={report} />{titleError}
                        </div>
                        }

                        <label className="label-job-creation"> Description* </label>
                        <textarea
                            className="input-2-job-creation"
                            id="description"
                            name="description"
                            value={description}
                            placeholder="Description"
                            onChange={this.handleChange}
                            onBlur={this.validateDescription}
                        />
                        {descriptionError !== undefined &&
                        <div className="required-field-job-creation">
                            <ReportProblemIcon style={report} /> {descriptionError}
                        </div>
                        }
                    </div>

                    <div className="big-flexbox-for-3-flexbox-containers-job-creation">
                        <label className="label-job-creation"> Street* </label>
                        <input
                            className="input-1-copy-job-creation"
                            style={{ width:"138.6%"}}
                            type="text"
                            id="street"
                            name="street"
                            value={street}
                            placeholder="Street"
                            onChange={this.handleChange}
                            onBlur={this.validateStreet}
                        />
                        {streetError !== undefined &&
                        <div className="required-field-job-creation">
                            <ReportProblemIcon style={report} /> {streetError}
                        </div>
                        }

                        <div className="mini-flex-box-job-creation">
                            <ItemsDropdown
                                ref={change_city}
                                validate={true}
                                itemsList={cities}
                                label='City'
                                required
                            />

                            <div style={{width: "108%"}}>
                                <label className="label-job-creation"> Zipcode* </label>
                                <input
                                    className="input-3-job-creation"
                                    type="text"
                                    id="zipcode"
                                    name="zipcode"
                                    value={zipcode}
                                    placeholder="Zipcode"
                                    onChange={this.handleChange}
                                    onBlur={this.validateZipcode}
                                />
                                {zipcodeError !== undefined &&
                                <div className="required-field-2-job-creation">
                                    <ReportProblemIcon style={report} /> {zipcodeError}
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="big-flexbox-for-3-lower-flexbox-containers-job-creation">
                    <div className="price-miniflex-job-creation">
                        <label className="label-job-creation" style={{paddingTop: 3.9}}> Price* </label>
                        <CurrencyTextField
                            currencySymbol="$"
                            outputFormat="string"
                            decimalCharacter="."
                            digitGroupSeparator=","
                            placeholder= "0.00"
                            name = "price"
                            onChange = {this.handleChange}
                            onBlur  = {this.validatePrice}
                            InputProps={{ disableUnderline: true }}          
                        />
                        {priceError !== undefined &&
                        <div className="required-field-2-job-creation">
                            {/* <hr className="price-error-job-creation" />
                            <hr className="price-error-1-job-creation" />
                            <hr className="price-error-2-job-creation" />
                            <hr className="price-error-3-job-creation" /> */}
                            <ReportProblemIcon style={report} />
                            {priceError}
                        </div>
                        }
                    </div>
                    <ItemsDropdown
                        required
                        label='Category'
                        ref={change_category}
                        validate={true}
                        itemsList={categories}
                    />
                    <div>
                        <label className="label-job-creation" >
                            Available days*
                            <p className="job-creation-available-days-disclaimer">
                                (Please make sure that at least one day is available for job completion)</p>
                        </label>
                        <AvailableDays ref={availableDays_chips}/>
                    </div>
                </div>

                <div style={{textAlign:"center"}}>
                    <button className="button-job-creation" onClick={this.handleCreateClick}>
                        <div className="text-button-job-creation">
                            CREATE
                            <CreateIcon style={editPencil}/>
                        </div>
                    </button>
                </div>
            </React.Fragment>
        )
    }

    // validation methods
    validateTitle(){
        if (this.state.title.length === 0) {
            this.setState({titleError: "This field is required" })
            document.querySelector('.input-1-job-creation').style.cssText = 'border: 2px solid #cc3300; ';
            return false;
        }

        document.querySelector('.input-1-job-creation').style.cssText = 'border: 3x solid black;';
        this.setState({titleError: undefined})
        return true;
    }

    validateStreet(){
        if (this.state.street.length === 0) {
            this.setState({streetError: "This field is required"})
            document.querySelector('.input-1-copy-job-creation').style.cssText = 'border: 2px solid #cc3300; position: relative; bottom: 1px';
            return false;
        }

        document.querySelector('.input-1-copy-job-creation').style.cssText = 'border: 3x solid black;';
        this.setState({streetError: undefined})
        return true;
    }

    validateDescription(){
        if (this.state.description.length === 0) {
            this.setState({descriptionError: "This field is required"})
            document.querySelector('.input-2-job-creation').style.cssText = 'border: 2px solid #cc3300;';
            return false;
        }

        document.querySelector('.input-2-job-creation').style.cssText = 'border: 3x solid black;';
        this.setState({descriptionError: undefined})
        return true;
    }

    validateZipcode(){
        if (this.state.zipcode.length === 0) {
            this.setState({zipcodeError: "This field is required"})
            document.querySelector('.input-3-job-creation').style.cssText = 'border: 2px solid #cc3300;';
            return false;
        }
        else if (!isNaN(this.state.zipcode) === false || (this.state.zipcode.length < 5) || this.state.zipcode.length >= 6){
            this.setState({zipcodeError: "zipcode format: #####" })

            document.querySelector('.input-3-job-creation').style.cssText = 'border: 2px solid #cc3300;';
            return false;
        }

        if (!zipcodeFormatPR.test(this.state.zipcode)) {
            this.setState({zipcodeError: 'Zipcode not from Puerto Rico'});

            return false;
        }

        document.querySelector('.input-3-job-creation').style.cssText = 'border: 3x solid black;';
        this.setState({zipcodeError: undefined})
        return true;
    }

    validatePrice(){
        if (this.state.price === '') {
            this.setState({priceError: "This field is required"})
            if(this.state.change_category?.current.state.categoryError !== undefined){
                document.querySelector('.price-miniflex-job-creation').style.cssText = 'margin-left: 66px';
            }
            else{
                document.querySelector('.price-miniflex-job-creation').style.cssText = 'margin-left: 56px;';
            }

            return false;
        }
        if(this.state.change_category?.current.state.categoryError === undefined && this.state.price !== ''){
            document.querySelector('.price-miniflex-job-creation').style.cssText = 'margin-left: 50px;';
        }
        else{
            document.querySelector('.price-miniflex-job-creation').style.cssText = 'margin-left: 66px;';
        }
        this.setState({priceError: undefined})
        return true;
    }
}

// small icons and elements css
const editPencil = {
    paddingRight: 10,
    height: 20,
    position: "relative",
    top: "3px"
}

const report = {
    color: "red",
    position: "relative",
    top: "4px"
}

export default JobCreation