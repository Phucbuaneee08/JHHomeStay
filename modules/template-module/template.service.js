const {Users} = require("../../models");
exports.get = async () => {
    //sample code to connect db of a model
    Users(DB_CONNECTION).findOne();
}

exports.getById = async (id) => {
    //code here
}

exports.create = async(data) => {
    //code here
}

exports.edit = async(id, data) => {
    //code here}
}

exports.delete = async(id) => {
    //code here
}

