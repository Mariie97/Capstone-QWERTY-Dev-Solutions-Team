import React, { Component, createRef } from 'react';
import "../Layouts/JobCreation.css";
import CitiesDropdown from "./CitiesDropdown_JobCreation.js"
import CategoriesDropdown from "./CategoriesDropdown_JobCreation.js"
import AvailableDays from './AvailableDaysChips_JobCreation';
import CurrencyTextField from "@unicef/material-ui-currency-textfield"
import CreateIcon from '@material-ui/icons/Create';

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
            availableDays_chips: createRef()

        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
		// webpage background color
		document.body.style.backgroundColor = "#2F2D4A";
	}

    handleChange(event){

        const {name, value} = event.target;
        this.setState({[name]:value});
        console.log(this.state);

    }

    render() {
        const { change_city, change_category } = this.state
        
        return (
        <React.Fragment>
            <h1 className="job-creation-page-header"> Job Creation </h1>
                <div className="big-flexbox-for-2-flexbox-containers-job-creation">
                    <div className="left-body-container-1-job-creation">
                        <label className="label-job-creation"> *Title: </label>
                        <input className="input-1-job-creation" type="text" id="title" name="title" placeholder="Title" onChange={this.handleChange}></input>
                        <label className="label-job-creation"> *Description: </label>
                        <textarea className="input-2-job-creation" type="text" id="description" name="description" placeholder="Description" 
                        onChange={this.handleChange}></textarea>
                    </div>
                    <div className="big-flexbox-for-3-flexbox-containers-job-creation">
                        <label className="label-job-creation"> *Street: </label>
                        <input className="input-1-job-creation" style={{ width:"138.6%"}} type="text" id="street" name="street" placeholder="Street"
                        onChange={this.handleChange}></input>

                        <div className="mini-flex-box-job-creation">
                            <div>
                            <label className="label-job-creation"> *City: </label>
                            <CitiesDropdown 
                            initial_value={''}
                            ref={change_city}
                            />
                            </div>
                            <div>
                                <label className="label-job-creation"> *Zipcode: </label>
                                <input className="input-3-job-creation" type="text" id="zipcode" name="zipcode" placeholder="Zipcode"
                                onChange={this.handleChange}></input>
                            </div>
                        </div>
                    </div>   
                </div>

            <div className="big-flexbox-for-3-lower-flexbox-containers-job-creation">
                <div className="price-miniflex-job-creation">
                    <label className="label-job-creation" style={{paddingTop: 2}}> *Price: </label>
                    <CurrencyTextField
                            currencySymbol="$"
                            outputFormat="string"
                            decimalCharacter="."
                            digitGroupSeparator=","
                            placeholder= "Price"
                            name = "price"
                            onChange = {this.handleChange}
			                // onChange={(event, value)=> setValue(value)}
                    />
                </div>

                <div> 
                    <label className="label-job-creation"> *Categories: </label>
                    <CategoriesDropdown 
                    initial_value={''}
                    ref={change_category}
                    />
                </div>

                <div> 
                    <label className="label-job-creation"> *Available days: </label>
                    <AvailableDays />
                </div>
            </div>

            <div style={{textAlign:"center"}}>
                <button className="button-job-creation">
                    <div className="text-button-job-creation">
                    CREATE 
                    <CreateIcon style={editpencil}/>
                    </div>   
                </button>
            </div>
        </React.Fragment>
        )
    }
}

// small icons and elements css

const editpencil = {
	paddingRight: 10,
	height: 20,
    position: "relative",
    top: "3px"
}

export default JobCreation
