
function GetExpirationTime(minutes) {
    const now = new Date();
    const expirationTime = new Date(now.getTime() + minutes * 60000); // 60000 ms in a minute
    return expirationTime;
}

export default GetExpirationTime;
