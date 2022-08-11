
//this converts from array of objects to only the required values in to new array of objects
exports.convertObjects = (users)=>{

    let temp = [];
    users.forEach(user => {
        temp.push({
            name : user.name,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus
        })
    });

    return temp;
}


