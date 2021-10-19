import React, { Component } from 'react'
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import "../Layouts/CitiesDropdown.css"



class CitiesDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: this.props.initial_value!==''? this.props.initial_value : undefined
        };

        this.handleOnchangeCity = this.handleOnchangeCity.bind(this);
        this.changeCity = this.changeCity.bind(this);
    }

    render() {
        const { city } = this.state;

        return (
            <div>
                <InputLabel id={"cities-dropdown-label"} >City*</InputLabel>
                <Select
                    labelId="cities-dropdown-label"
                    id={"cities-dropdown"}
                    value={city}
                    onChange={this.handleOnchangeCity}
                >
                    <MenuItem value={1}>Adjuntas</MenuItem>
                    <MenuItem value={2}>Aguada</MenuItem>
                    <MenuItem value={3}>Aguadilla</MenuItem>
                    <MenuItem value={4}>Aguas Buenas</MenuItem>
                    <MenuItem value={5}>Aibonito</MenuItem>
                    <MenuItem value={6}>Arecibo</MenuItem>
                    <MenuItem value={7}>Arroyo</MenuItem>
                    <MenuItem value={8}>Añasco</MenuItem>
                    <MenuItem value={9}>Barceloneta</MenuItem>
                    <MenuItem value={10}>Barranquitas</MenuItem>
                    <MenuItem value={11}>Bayamón</MenuItem>
                    <MenuItem value={12}>Cabo Rojo</MenuItem>
                    <MenuItem value={13}>Caguas</MenuItem>
                    <MenuItem value={14}>Camuy</MenuItem>
                    <MenuItem value={15}>Canóvanas</MenuItem>
                    <MenuItem value={16}>Carolina</MenuItem>
                    <MenuItem value={17}>Cataño</MenuItem>
                    <MenuItem value={18}>Cayey</MenuItem>
                    <MenuItem value={19}>Ceiba</MenuItem>
                    <MenuItem value={20}>Ciales</MenuItem>
                    <MenuItem value={21}>Cidra</MenuItem>
                    <MenuItem value={22}>Coamo</MenuItem>
                    <MenuItem value={23}>Comerío</MenuItem>
                    <MenuItem value={24}>Corozal</MenuItem>
                    <MenuItem value={25}>Culebra</MenuItem>
                    <MenuItem value={26}>Dorado</MenuItem>
                    <MenuItem value={27}>Fajardo</MenuItem>
                    <MenuItem value={28}>Florida</MenuItem>
                    <MenuItem value={29}>Guayama</MenuItem>
                    <MenuItem value={30}>Guayanilla</MenuItem>
                    <MenuItem value={31}>Guaynabo</MenuItem>
                    <MenuItem value={32}>Gurabo</MenuItem>
                    <MenuItem value={33}>Guánica</MenuItem>
                    <MenuItem value={34}>Hatillo</MenuItem>
                    <MenuItem value={35}>Hormigueros</MenuItem>
                    <MenuItem value={36}>Humacao</MenuItem>
                    <MenuItem value={37}>Isabela</MenuItem>
                    <MenuItem value={38}>Jayuya</MenuItem>
                    <MenuItem value={39}>Juana Díaz</MenuItem>
                    <MenuItem value={40}>Juncos</MenuItem>
                    <MenuItem value={41}>Lajas</MenuItem>
                    <MenuItem value={42}>Lares</MenuItem>
                    <MenuItem value={43}>Las Marías</MenuItem>
                    <MenuItem value={44}>Las Piedras</MenuItem>
                    <MenuItem value={45}>Loiza</MenuItem>
                    <MenuItem value={46}>Luquillo</MenuItem>
                    <MenuItem value={47}>Manatí</MenuItem>
                    <MenuItem value={48}>Maricao</MenuItem>
                    <MenuItem value={49}>Maunabo</MenuItem>
                    <MenuItem value={50}>Mayagüez</MenuItem>
                    <MenuItem value={51}>Moca</MenuItem>
                    <MenuItem value={52}>Morovis</MenuItem>
                    <MenuItem value={53}>Naguabo</MenuItem>
                    <MenuItem value={54}>Naranjito</MenuItem>
                    <MenuItem value={55}>Orocovis</MenuItem>
                    <MenuItem value={56}>Patillas</MenuItem>
                    <MenuItem value={57}>Peñuelas</MenuItem>
                    <MenuItem value={58}>Ponce</MenuItem>
                    <MenuItem value={59}>Quebradillas</MenuItem>
                    <MenuItem value={60}>Rincón</MenuItem>
                    <MenuItem value={61}>Rio Grande</MenuItem>
                    <MenuItem value={62}>Sabana Grande</MenuItem>
                    <MenuItem value={63}>Salinas</MenuItem>
                    <MenuItem value={64}>San Germán</MenuItem>
                    <MenuItem value={65}>San Juan</MenuItem>
                    <MenuItem value={66}>San Lorenzo</MenuItem>
                    <MenuItem value={67}>San Sebastián</MenuItem>
                    <MenuItem value={68}>Santa Isabel</MenuItem>
                    <MenuItem value={69}>Toa Alta</MenuItem>
                    <MenuItem value={70}>Toa Baja</MenuItem>
                    <MenuItem value={71}>Trujillo Alto</MenuItem>
                    <MenuItem value={72}>Utuado</MenuItem>
                    <MenuItem value={73}>Vega Alta</MenuItem>
                    <MenuItem value={74}>Vega Baja</MenuItem>
                    <MenuItem value={75}>Vieques</MenuItem>
                    <MenuItem value={76}>Villalba</MenuItem>
                    <MenuItem value={77}>Yabucoa</MenuItem>
                    <MenuItem value={78}>Yauco</MenuItem>
                </Select>
            </div>
        )
    }

    handleOnchangeCity(event) {
        this.changeCity(event.target.value.toString());
    }

    changeCity(value) {
        this.setState({
            city: value
        });
    }
}

export default CitiesDropdown;
