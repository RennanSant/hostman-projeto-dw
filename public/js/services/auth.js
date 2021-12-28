function isAuthenticated() {
    if (getToken()) {
        return true;
    } else {
        redirectToSignin();
    }
}
  
function getToken() {
    return localStorage.getItem("@HostMan:token");
}

function signin(token) {
    localStorage.setItem("@HostMan:token", token);

    redirectToHome();
}

function signout() {
    fetch("/signout");

    redirectToSignin();
}

function redirectToHome() {
    window.location.href = "./index.html";
}

function redirectToSignin() {
    localStorage.removeItem("@HostMan:token");

    window.location.href = "./login.html";
}
  
export default { isAuthenticated, getToken, signin, signout, redirectToHome, redirectToSignin };