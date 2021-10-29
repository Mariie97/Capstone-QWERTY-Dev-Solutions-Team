import React, { Component } from 'react';
import '../Layouts/JobDashboardCard.css'

class JobDashboardCard extends Component {
    componentDidMount(){
        document.body.style.backgroundColor = "#2F2D4A";
    }

    render() {
        return (
            <div className="card-body-wrapper">
                <div className="card-wrapper">
                    <div className="card-wrapper-1">
                        <div className="card-body">
                            
                            <h2 className="card-title">Lavar Platos
                                <div className= "circle-square"></div>
                                <div className= "circle-square2"></div>
                            </h2>
                    
                            <h2 className="card-clientName"> FeFa Vargas Villarini</h2>
                            <p className="card-location">
                            Calle Caoba 00718
                            </p>
                            <div className="card-price"> $1000 </div>
                        </div>
                    </div>

                    <div className="card-wrapper-1">
                        <div className="card-body">
                            
                            <h2 className="card-title"> Recoger la sala
                                <div className= "circle-square"></div>
                                <div className= "circle-square2"></div>
                            </h2>
                    
                            <h2 className="card-clientName"> Pepe cojones </h2>
                            <p className="card-location">
                            Calle Caoba 00718
                            </p>
                            <div className="card-price"> $1000000 </div>
                        </div>
                    </div>
                </div>                  
            </div>
         
        )
    }
}

export default JobDashboardCard;
