import React, { Component, createRef } from 'react';
import "../Layouts/JobCreation.css";
import CitiesDropdown from "./CitiesDropdown_JobCreation.js"
import CategoriesDropdown from "./CategoriesDropdown_JobCreation.js"
import AvailableDays from './AvailableDaysChips_JobCreation';
import CurrencyTextField from "@unicef/material-ui-currency-textfield"
import CreateIcon from '@material-ui/icons/Create';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

export class JobCreation extends Component {
    
    constructor(props){
        super(props);

        this.state = {

            title : '',
            street: '',
            description: '',
            zipcode: '',
            price: '0.00',
            change_city: createRef(),
            change_category: createRef(),
            availableDays_chips: createRef(),
            titleError: undefined,
            // streetError: undefined,
            // descriptionError: undefined,
            // zipcodeError: undefined,
            // priceError: undefined,
            // change_cityError: undefined,
            // change_categoryError: undefined,
            // availableDays_chipsError:undefined

        };

        //event methods - before render method

        this.handleChange = this.handleChange.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);

        //validation methods - end of render method

        this.validateTitle = this.validateTitle.bind(this);
    }

    componentDidMount() {

		// webpage background color

		document.body.style.backgroundColor = "#2F2D4A";
	}

    handleChange(event){

        // const price_regex = new RegExp("^[0-9][0-9][0-9].[0-9][0-9]$");

        const {name, value} = event.target;
        if(name === "title" && value.length <= 500){ 
            this.setState({[name]:value});}
        else if(name === "street" && value.length <=30 ){this.setState({[name]:value});}
        else if(name === "description" && value.length <= 500){this.setState({[name]:value});}
        else if(name === "zipcode" && value.length <= 5 && !isNaN(value)){this.setState({[name]:value});}
        // else if(name ==="price" && price_regex.test(value)=== false){ 
        else if(name === "price"){
            const format_price = value.replaceAll(',','')
            this.setState({[name]:format_price});}    
    }

  



    handleCreateClick(){
        
        const { title, street, description, zipcode, price, change_city,
        change_category, availableDays_chips } = this.state

        


        console.log(price, "price")

        const city = change_city?.current.state.city
        const category = change_category?.current.state.category
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
                    console.log("successful")
                    
                    }
                else{
                   console.log("can't create job!!!!")
                }
            }
        )
    }




    render() {
        const { change_city, change_category, availableDays_chips } = this.state
        console.log(this.state.titleError)
        
        return (
        <React.Fragment>
            <h1 className="job-creation-page-header"> Job Creation </h1>
                <div className="big-flexbox-for-2-flexbox-containers-job-creation">
                    <div className="left-body-container-1-job-creation">
                        <label className="label-job-creation"> Title* </label>
                        <input className="input-1-job-creation" type="text" id="title" name="title" placeholder="Title" 
                        onChange={this.handleChange} onBlur={this.validateTitle} ></input>
                        {this.state.titleError !== undefined &&
                            <div className="required-field-job-creation">
                            <ReportProblemIcon style={report} /> {this.state.titleError} 
                            </div>
                        }
                        

                        <label className="label-job-creation"> Description* </label>
                        <textarea className="input-2-job-creation" type="text" id="description" name="description" placeholder="Description" 
                        onChange={this.handleChange}></textarea>
                    </div>
                    <div className="big-flexbox-for-3-flexbox-containers-job-creation">
                        <label className="label-job-creation"> Street* </label>
                        <input className="input-1-job-creation" style={{ width:"138.6%"}} type="text" id="street" name="street" placeholder="Street"
                        onChange={this.handleChange}></input>

                        <div className="mini-flex-box-job-creation">
                            <div>
                            <label className="label-job-creation"> City* </label>
                            <CitiesDropdown 
                                initial_value={''}
                                ref={change_city}
                            />
                            </div>
                            <div>
                                <label className="label-job-creation"> Zipcode* </label>
                                <input className="input-3-job-creation" type="text" id="zipcode" name="zipcode" placeholder="Zipcode"
                                onChange={this.handleChange}></input>
                            </div>
                        </div>
                    </div>   
                </div>

            <div className="big-flexbox-for-3-lower-flexbox-containers-job-creation">
                <div className="price-miniflex-job-creation">
                    <label className="label-job-creation" style={{paddingTop: 2}}> Price* </label>
                    <CurrencyTextField
                            currencySymbol="$"
                            outputFormat="string"
                            decimalCharacter="."
                            digitGroupSeparator=","
                            placeholder= "0.00"
                            name = "price"
                            onChange = {this.handleChange}
                    />
                </div>

                <div> 
                    <label className="label-job-creation"> Categories* </label>
                    <CategoriesDropdown 
                    initial_value={''}
                    ref={change_category}
                    />
                </div>

                <div> 
                    <label className="label-job-creation"> Available days* </label>
                    <AvailableDays ref={availableDays_chips} />
                </div>
            </div>

            <div style={{textAlign:"center"}}>
                <button className="button-job-creation" onClick={this.handleCreateClick}>
                    <div className="text-button-job-creation">
                    CREATE 
                    <CreateIcon style={editpencil}/>
                    </div>   
                </button>
            </div>
        </React.Fragment>
        )
    }

    // validation methods 

    validateTitle(){
        if (this.state.title.length === 0) {
            this.setState({
                titleError: "This field is required"
                
            })
            document.querySelector('.input-1-job-creation').style.cssText = 'border: 2px solid #cc3300; ';
            return false;
        }
        
        document.querySelector('.input-1-job-creation').style.cssText = 'border: 3x solid black;';
        
        this.setState({
            titleError: undefined
        })
        return true;
    }
}

// small icons and elements css

const editpencil = {
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



     


