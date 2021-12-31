const { Services } = require('../../../models');
const { db } = require('../../../helpers/dbHelper');

// Api trả lại danh sách services
exports.getAllServices = async () => {
    const services = await Services(db).aggregate([
        {
            $project: {
                "bills":0, "homestays": 0
            }
        }
    ]);
    console.log(services);
    return services;
}
