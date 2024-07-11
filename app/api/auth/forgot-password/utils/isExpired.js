
function isExpired(expirationTime) {
    const now = new Date();
    return now >= expirationTime;
};

export default isExpired;