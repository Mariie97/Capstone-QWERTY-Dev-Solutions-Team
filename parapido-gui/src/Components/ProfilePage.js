import React, { Component } from 'react'

export class Profile extends Component {    

        constructor(props){
            super(props)


            this.state = { users : [
                // first_name : '',
                // last_name : '',
                // email : '',
                // about : '',
                // type  :'',
                // image : '', 
                // jobs_cancelled : '',
                // rating_value : '',
            ]
            }
    }
    
    componentDidMount(){

        // webpage background color

        document.body.style.backgroundColor = "#2F2D4A"

        //get from servers the specific user

        fetch("/users").then(res => res.json()).then(ress=> console.log(ress.data));
      
    }

    render() {
        return (
            <div>
                <h1 style={{color:'white', marginTop: 20, marginLeft: 30}}> Hello Profile </h1>
            </div>
        )
    }
}

export default Profile

