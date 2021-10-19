export default function verifyUserAuth(token) {
    if(token===undefined)
        return false;

    return fetch('/is_valid_token', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'X-CSRF-TOKEN': token
        }
    }).then(response => {
        return response.status === 200;
    })
}

export const cities = [
    "Adjuntas",
    "Aguada",
    "Aguadilla",
    "Aguas Buenas",
    "Aibonito",
    "Añasco",
    "Arecibo",
    "Arroyo",
    "Barceloneta",
    "Barranquitas",
    "Bayamon",
    "Cabo Rojo",
    "Caguas",
    "Camuy",
    "Canovanas",
    "Carolina",
    "Cataño",
    "Cayey",
    "Ceiba",
    "Ciales",
    "Cidra",
    "Coamo",
    "Comerio",
    "Corozal",
    "Culebra",
    "Dorado",
    "Fajardo",
    "Florida",
    "Guanica",
    "Guayama",
    "Guayanilla",
    "Guaynabo",
    "Gurabo",
    "Hatillo",
    "Hormigueros",
    "Humacao",
    "Isabela",
    "Jayuya",
    "Juana Diaz",
    "Juncos",
    "Lajas",
    "Lares",
    "Las Marias",
    "Las Piedras",
    "Loiza",
    "Luquillo",
    "Manati",
    "Maricao",
    "Maunabo",
    "Mayaguez",
    "Moca",
    "Morovis",
    "Naguabo",
    "Naranjito",
    "Orocovis",
    "Patillas",
    "Peñuelas",
    "Ponce",
    "Quebradillas",
    "Rincon",
    "Rio Grande",
    "Sabana Grande",
    "Salinas",
    "San German",
    "San Juan",
    "San Lorenzo",
    "San Sebastian",
    "Santa Isabel",
    "Toa Alta",
    "Toa Baja",
    "Trujillo Alto",
    "Utuado",
    "Vega Alta",
    "Vega Baja",
    "Vieques",
    "Villalba",
    "Yabucoa",
    "Yauco",
];

export const jobStatus = {
    posted: 1,
    in_process: 2,
    completed: 3,
    cancelled: 4,
    deleted: 5,
};

export const accountType = {
    student: 1,
    client: 2,
    superuser: 3,
};