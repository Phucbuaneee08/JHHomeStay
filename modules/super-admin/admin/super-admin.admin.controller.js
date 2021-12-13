const AdminService = require('./super-admin.admin.service');

//API update thông tin của Admin
exports.updateAdminById = async (req, res) => {
    try {
        //Lấy các thông tin để update cho Admin.
        const data = req.body;
        const id = data.id;
        const name = data.name;
        const address = data.address;
        const role = data.role;
        const email = data.email;
        const password = data.password;
        const phone = data.phone;
        const status = data.status;
        const gender = data.gender;
        const identification = data.identification;
        const avatarUrl = data.avatarUrl;
        const dateAtBirth = data.dateAtBirth;
        const homestays = data.homestays;

        let admin = await AdminService.updateAdminById(id, name, address, role, email, password, phone, status, gender, identification, avatarUrl, dateAtBirth, homestays);
        return res.status(200).json({
            success: true,
            content: admin
        });
    } catch (error) {
        // Nếu ko thành công -> 404
        return res.status(404).json({
            success: false,
            message: Array.isArray(error) ? error : "Admin's id is not correct!",
            content: error
        });
    }
}
exports.createAdmin = async (req, res) => {
    if (req.user.role !== "super_admin") {
        return res.status(400).json({
            success: false,
            content: null,
            message: "Chưa đăng nhập với tư cách là Super Admin"
        })
    } else try {
        const data = req.body;
        const name = data.name;
        const address = data.address;
        const role = data.role;
        const email = data.email;
        const password = data.password;
        const phone = data.phone;
        const status = data.status;
        const gender = data.gender;
        const identification = data.identification;
        const avatarUrl = data.avatarUrl;
        const dateArWork = data.dateAtWork;
        const dateAtBirth = data.dateAtBirth;
        const homestays = data.homestays;
        const superAdmin = data.superAdmin;

        let admin = await AdminService.createAdmin(name, address, role, email, password, phone, status, gender, identification, avatarUrl,dateArWork, dateAtBirth, homestays);
        if (admin === 0) {
            return res.status(400).json({
                success: false,
                content: null,
                message: "Không đủ dữ liệu để có thể tạo một admin mới!"
            })
        }
        else {
            if (admin === 1) {
                return res.status(400).json({
                    success: false,
                    content: null,
                    message: "Admin này đã có sẵn!"
                })
            }
            else return res.status(200).json({
                success: true,
                content: admin
            })
        };
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: Array.isArray(error) ? error : "Admin's id is not correct!",
            content: error
        });
    }
}