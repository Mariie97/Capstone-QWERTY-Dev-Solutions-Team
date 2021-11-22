export function verifyUserAuth(token) {
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

export function buildURL(path, filters={}) {
    let url = new URL(`${process.env.REACT_APP_API_URL}${path}`);

    if (Object.keys(filters).length>0) {
        url.search = new URLSearchParams(filters).toString();
    }

    return url.toString();
}

export function setJobStatus(token, job_id, status) {
    return fetch(`/job_status/${job_id}`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token
        },
        body: JSON.stringify({
            status: status
        })
    }).then(response => {
        return response.status === 200;
    })
}

export function cancelJobRequest(token, job_id, student_id){
    return fetch('/cancel_request', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token
        },
        body: JSON.stringify({
            job_id: job_id,
            student_id: student_id,
        })
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

export const jobStatus = {
    posted: 1,
    in_process: 2,
    completed: 3,
    cancelled: 4,
    deleted: 5,
};

export function getQueryParams(query) {
    return new URLSearchParams(query);
}

export const getJobStatus = [
    'Posted',
    'In process',
    'Completed',
    'Cancelled',
    'Deleted',
]

export const securityQuestions = [
    "In what city were you born?",
    "What high school did you attend?",
    "What was your favorite food as a child?",
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
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export const categories = [
    'Animals',
    'Auto',
    'Education',
    'Events',
    'Home',
    'Self-care',
    'Shop',
    'Other'
];

export const prices = [
    'Less than $20.00',
    '$20.00 to $40.00',
    '$50.00 to $60.00',
    '$70.00 to $100.00',
    'More than $100.00'
];

export const years = [
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
    '2028'
];

export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const ratings = [
    '1',
    '2',
    '3',
    '4',
    '5',
];

export const zipcodeFormatPR = /^00[679]\d{2}$/;

export const mapAccount = {
    1: "Student",
    2: "Client",
    3: "Admin"
};
