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
    'Adjuntas',
    'Aguada',
    'Aguadilla',
    'Aguas Buenas',
    'Aibonito',
    'Arecibo',
    'Arroyo',
    'Añasco',
    'Barceloneta',
    'Barranquitas',
    'Bayamón',
    'Cabo Rojo',
    'Caguas',
    'Camuy',
    'Canóvanas',
    'Carolina',
    'Cataño',
    'Cayey',
    'Ceiba',
    'Ciales',
    'Cidra',
    'Coamo',
    'Comerío',
    'Corozal',
    'Culebra',
    'Dorado',
    'Fajardo',
    'Florida',
    'Guayama',
    'Guayanilla',
    'Guaynabo',
    'Gurabo',
    'Guánica',
    'Hatillo',
    'Hormigueros',
    'Humacao',
    'Isabela',
    'Jayuya',
    'Juana Díaz',
    'Juncos',
    'Lajas',
    'Lares',
    'Las Marías',
    'Las Piedras',
    'Loiza',
    'Luquillo',
    'Manatí',
    'Maricao',
    'Maunabo',
    'Mayagüez',
    'Moca',
    'Morovis',
    'Naguabo',
    'Naranjito',
    'Orocovis',
    'Patillas',
    'Peñuelas',
    'Ponce',
    'Quebradillas',
    'Rincón',
    'Rio Grande',
    'Sabana Grande',
    'Salinas',
    'San Germán',
    'San Juan',
    'San Lorenzo',
    'San Sebastián',
    'Santa Isabel',
    'Toa Alta',
    'Toa Baja',
    'Trujillo Alto',
    'Utuado',
    'Vega Alta',
    'Vega Baja',
    'Vieques',
    'Villalba',
    'Yabucoa',
    'Yauco',
];

export const current_user = {
        id: parseInt(localStorage.getItem('user_id')),
        type: parseInt(localStorage.getItem('type'))
    };

export const jobStatus = {
    posted: 1,
    in_process: 2,
    completed: 3,
    cancelled: 4,
    deleted: 5,
};

export const getJobStatus = [
    'Posted',
    'In process',
    'Completed',
    'Cancelled',
    'Deleted',
]


export const accountType = {
    student: 1,
    client: 2,
    admin: 3,
};

export const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Thursday',
    'Friday',
    'Saturday'
]