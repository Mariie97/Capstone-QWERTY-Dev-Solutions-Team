import React, { Component } from "react";
import { MenuItem, Select } from "@material-ui/core";
import StyledEngineProvider from "@material-ui/styles/StylesProvider";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

class ItemsDropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: this.props.initial_value !== undefined ? this.props.initial_value : '',
            itemError: undefined,
        };

        // event method - before render method
        this.handleOnChangeCity = this.handleOnChangeCity.bind(this);

        // validation method - end of render method
        this.validateItem = this.validateItem.bind(this);
        this.validate = this.validate.bind(this);

        this.getAllItems = this.getAllItems.bind(this);
        this.reset = this.reset.bind(this);

    }

    handleOnChangeCity(event) {
        this.setState({
            item: event.target.value.toString()
        }, this.validate);
    }

    validate() {
        const { validate, validationFunc } = this.props;
        if(validationFunc)
            return validationFunc();

        if (validate)
            return this.validateItem();
    }

    getAllItems() {
        const { itemsList } = this.props;
        return itemsList.map((item, index) =>
            <MenuItem key={`${item}-${index}`} value={index+1}>{item}</MenuItem>
        )
    }


    render() {
        const { item, itemError } = this.state;
        const { label, required, blackLabel, removeDefault, cormorantlabel, lineheightstyle} = this.props;
        return (
            <StyledEngineProvider injectFirst>
                <div>
                    <label  style={{lineHeight: lineheightstyle}} className={ cormorantlabel !== undefined ? 'cormorant-label-text' : `custom-input-label ${blackLabel !== undefined && 'black-label-text'}
                    `}> {label}{required && '*'} </label>
                    <br/>
                    <Select
                        value={item}
                        onChange={this.handleOnChangeCity}
                        className={itemError !== undefined ?  "item-dropdown dropdown-error" : "item-dropdown"}
                        onClose={this.validate}
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                        inputProps={{
                            underline: {
                                "&&&:before": {
                                    borderBottom: "none"
                                },
                                "&&:after": {
                                    borderBottom: "none"
                                }
                            }
                        }}
                        disableUnderline
                    >
                        {removeDefault === undefined &&
                        <MenuItem value={'0'}>Choose one... </MenuItem>
                        }
                        {this.getAllItems()}
                    </Select>
                    {itemError !== undefined &&
                    <div className="required-dropdown">
                        <ReportProblemIcon style={report} />
                        {itemError}
                    </div>
                    }
                </div>
            </StyledEngineProvider>
        )
    }

    validateItem(){
        if (this.state.item === '' || this.state.item === '0') {
            this.setState({
                itemError: "This field is required"
            })
            return false;
        }

        this.setState({
            itemError: undefined
        })
        return true;
    }

    reset() {
        const { initial_value } = this.props;
        this.setState({item: initial_value !== undefined? this.props.initial_value : ''})
    }
}

const report = {
    color: "red",
    position: "relative",
    top: "4px"
}

export default ItemsDropdown;