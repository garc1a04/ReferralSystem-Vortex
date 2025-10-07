export const API_BASE_URL = "http://localhost:8080";

export function URL() {
    const URL = window.location.href
    if(URL.includes("/")) {
        let arr = URL.split("/")
        return arr[0]+"//"+arr[2];
    }
    return URL;
}