export const chatConnectionUrl = 'https://apzbackend.azurewebsites.net';
export const baseUrl = chatConnectionUrl + '/api';

// export const azure = https://apzbackend.azurewebsites.net
// export const local = https://localhost:5001
export const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}