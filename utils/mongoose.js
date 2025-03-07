
function mongooseSearchFilter(paramName, search, caseInsensitive = true) {
    const filter = {
        [paramName]: {
            $regex: search
        }
    }
    if(caseInsensitive) {
        filter[paramName]["$options"] = "i"
    }
    return 
}

module.exports = {
    mongooseSearchFilter
}