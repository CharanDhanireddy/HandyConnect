
export function setUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

export function getUserData() {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    return userData
}

export function setVendorData(vendorData) {
    localStorage.setItem('vendorData', JSON.stringify(vendorData));
}

export function getVendorData() {
    const vendorDataString = localStorage.getItem('vendorData');
    const vendorData = JSON.parse(vendorDataString);
    return vendorData
}
export function getToken() {
    let userData = getUserData()
    let vendorData = getVendorData()
    if (userData) return userData.id
    else if (vendorData) return vendorData.id
    else return null
}

export function getCity() {
    const userData = getUserData()
    return userData ? { city_id: userData?.city_id, city_name: userData?.city_name } : null
}

export function setCity(city) {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    localStorage.setItem('userData', JSON.stringify({ ...userData, city_id: city.city_id, city_name: city.city_name }))
}

export function isLoggedIn() {
    return (getToken() != null)
}

export function removeLoginData() {
    localStorage.removeItem('userData');
    localStorage.removeItem('vendorData');
}