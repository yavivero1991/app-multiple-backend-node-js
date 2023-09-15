const handleCleanUser = (user) => {

    user.set("password", undefined, {strict: false})
    user.set("deleted", undefined, {strict: false})
    user.set("createdAt", undefined, {strict: false})
    user.set("updatedAt", undefined, {strict: false})
}

module.exports = { handleCleanUser }