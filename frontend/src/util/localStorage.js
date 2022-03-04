
export function setUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

export function getUserData() {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    return userData
}

export function getToken() {
    return getUserData()?.id
}

export function getCity() {
    return { city_id: getUserData().city_id, city_name: getUserData().city_name }
}

export function setCity(city) {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    localStorage.setItem('userData', JSON.stringify({ ...userData, city_id: city.city_id, city_name: city.city_name }))
}

export function isLoggedIn() {
    return (getToken() != null)
}

export function removeUserData() {
    localStorage.removeItem('userData');
}