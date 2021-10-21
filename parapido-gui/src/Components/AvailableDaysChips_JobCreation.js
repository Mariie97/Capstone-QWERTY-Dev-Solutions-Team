import React, { Component } from 'react'
import "../Layouts/JobCreation.css"
import { styled } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));


class AvailableDaysChips_JobCreation extends Component {
    constructor(props){
        super(props);

        this.state = {chipData : [
            { key: 0, label: 'Sunday' },
            { key: 1, label: 'Monday' },
            { key: 2, label: 'Tuesday' },
            { key: 3, label: 'Wednesday' },
            { key: 4, label: 'Thursday' },
            { key: 5, label: 'Friday'},
            { key: 6, label: 'Saturday'}
        ],
        chipError: undefined,
     
    }

        // event methods - before render method

        this.handleAvailableDaysDelete = this.handleAvailableDaysDelete.bind(this);

        // validation methods - end of render method

        this.validateChips = this.validateChips.bind(this);
    }

    handleAvailableDaysDelete(chipToDelete) {
        
        this.validateChips();
        const chipList = this.state.chipData
      
        const removed_chip = chipList.filter((chip) => chip.key !== chipToDelete.key)
        
        this.setState({
            chipData:  removed_chip,     
        }
        );   

        console.log(this.state.chipData)
    };

    render() {

console.log(this.state.chipError)

        return (
                
                <React.Fragment>
                {this.state.chipData.length === 0 && <AvailableDaysChips_JobCreation />}

                <div className="chip-flex-job-creation"
                >
                {this.state.chipData.map((data) => {
                    return (
                    <ListItem key={data.key}
                    >
                        <Chip
                        style = {chipStyleJobCreation}
                        label={data.label}
                        onDelete={() => this.handleAvailableDaysDelete(data)}
                        />
                    </ListItem>
                    );
                })}
            </div>
            </React.Fragment>
        )
    }

    validateChips(){
        if (this.state.chipData.length === 1) {
            this.setState({
                chipError: "This field is required",
            })
            return false;
        }
        
        this.setState({
            chipError: undefined
        })
        return true;
    }

}

const chipStyleJobCreation = {
    backgroundColor : "#FFEBCC",
    fontFamily : "Jost",
    fontSize : 15, 
}

export default AvailableDaysChips_JobCreation;
