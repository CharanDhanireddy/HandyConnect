
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
    return getUserData()?.city
}

export function setCity(city) {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    localStorage.setItem('userData', JSON.stringify({ ...userData, city }))
}

export function isLoggedIn() {
    return (getToken() != null)
}

export function removeUserData() {
    localStorage.removeItem('userData');
}