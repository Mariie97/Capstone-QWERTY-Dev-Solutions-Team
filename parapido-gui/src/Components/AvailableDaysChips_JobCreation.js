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
    }

        this.handleAvailableDaysDelete = this.handleAvailableDaysDelete.bind(this);
    }

        handleAvailableDaysDelete(chipToDelete) {
              
                const chipList = this.state.chipData
                // console.log(chipToDelete)

                const removed_chip = chipList.filter((chip) => chip.key !== chipToDelete.key)
                // console.log(test)
                
                this.setState({
                    chipData:  removed_chip
                }
                );   

                

        };

    render() {
        return (
                <div className="chip-flex-job-creation">
                {this.state.chipData.map((data) => {
                    return (
                    <ListItem key={data.key}>
                        <Chip
                        style = {chipStyleJobCreation}
                        label={data.label}
                        onDelete={() => this.handleAvailableDaysDelete(data)}
                        />
                    </ListItem>
                    );
                })}
            </div>
        )
    }
}

const chipStyleJobCreation = {
    backgroundColor : "#FFEBCC",
    fontFamily : "Jost",
    fontSize : 15, 
}

export default AvailableDaysChips_JobCreation;
