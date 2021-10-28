import React, { Component } from 'react';
import '../Layouts/JobDashboardCard.css'

class JobDashboardCard extends Component {
    render() {
        return (
            <div className="card-body-wrapper">
                <div className="card-wrapper">
                    <div className="card-wrapper-1">
                        <div className="card-body">
                            <h2 className="card-title">Lavar Platos</h2>
                            <h2 className="card-clientName"> Fefa Vargas Villarini </h2>
                            <p className="card-location">
                            Calle Caoba 00718
                            </p>
                            <div> $1000 </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default JobDashboardCard;
