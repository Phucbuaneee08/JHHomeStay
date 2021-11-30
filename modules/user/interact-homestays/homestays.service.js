const {Homestays, Amenities, GeneralServices} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
const {compare} = require("bcrypt");
const HomestaysQtyEachSlice = 16;
exports.getRankingHomestays = async (quantity) => {
    console.log(quantity);
    const homestays = await Homestays(db).aggregate([
        {
            $set: {
                totalRate: {$sum: {
                    $sum: ["$rates.cleanRate", "$rates.serviceRate", "$rates.valueRate", "$rates.accuracyRate"]
                    }
                }
            }
        },
        {
            $sort: { totalRate: -1}
        },
        {
            $limit: Number(quantity)
        }
    ]);
    console.log(homestays);
    return homestays;
}

exports.createRating = async (id, rate) => {
    const homestay = await Homestays(db).findByIdAndUpdate(id, {
        $push: {rates: rate}
    }, {new: true})
    return homestay;
}

exports.getHomestayById = async (id) => {
    /*Tìm homestay có id như yêu cầu trong Bảng Homestay
    -> Sau đó dùng Populate để chuyển hết các thuộc tính dạng ObjectId (đã kết nối lúc seed)
    sang thành đối tượng tương ứng trong cơ sở dữ liệu
    */
    return Homestays(db).findById(id)
        .populate('services')
        .populate('generalServices')
        .populate('photos');
}

exports.getHomestayByFilter = async(province, type,rate, lowPrice, highPrice, generalServices, amenities, slide) =>  {

    //Chuẩn bị Filter để lọc dữ liệu
    let keyFilter = {};
    if (province) {
        keyFilter = { ...keyFilter, province: {$regex: province},}
    }
    if (type) {
        keyFilter = { ...keyFilter, type: {$regex: type},}
    }
    if (rate) {
        keyFilter = { ...keyFilter, rate: {$gte: rate}}
    }
    if (generalServices) {
        keyFilter = { ...keyFilter, generalServices:  {$all: generalServices}}
    }
    if (amenities) {
        keyFilter = { ...keyFilter, amenities: {$all: amenities}}
    }
    if (lowPrice) {
        keyFilter = {...keyFilter, price: {$gte: lowPrice}}
    }
    if (lowPrice) {
        keyFilter = {...keyFilter, price: {$lte: highPrice}}
    }

    //Lọc theo filter và trả về số lượng homestays là 16, theo đúng số homestays mỗi trang cho FE
    let homestaysDocs =  await Homestays(db).find(keyFilter).sort({'price': 'desc'}).exec();
    if (slide <= homestaysDocs.length/HomestaysQtyEachSlice) {
        return homestaysDocs.slice(slide*HomestaysQtyEachSlice, slide*HomestaysQtyEachSlice+HomestaysQtyEachSlice);
    }
    else return homestaysDocs.slice(0,HomestaysQtyEachSlice);
}
//Lấy Amenities theo mảng ID được truyền vào từ trước
exports.getAmenitiesByID = async(id) => {
    let amenities = [];
    if (id === null) return null; //Nếu người dùng không sử dụng amenities -> cho bằng null để Filter
    else {
        try { // Thử gán các amenities trong mảng bằng các document Amenities tìm được.
            for (let i = 0; i < id.length; i ++) {
                amenities[i] = await Amenities(db).findById(id[i]);
            }
        }
            // Try không được vì chỉ có một phần tử ID, lúc này id.length lại không phải là độ dài mảng mà là độ dài của String Id.
            // Cho nên lúc này ta hiểu rằng đó là mảng id cho vào chỉ có một phần tử duy nhất mà thôi
        catch (error){
            amenities[0] = await Amenities(db).findById(id);
        }
    }
    return amenities;// Trả về mảng Amenities
}

//Lấy General Services theo mảng ID được truyền vào từ trước
exports.getGeneralServiceByID= async(id) => {
    let generalServices = [];
    if (id === null) return null; // Giống như Amenities. -> đọc lại getAmenitiesByID để hiểu
    else {
        try {
            for (let i = 0; i < id.length; i ++) {
                generalServices[i] = await GeneralServices(db).findById(id[i]);
            }
        }
        catch (error){
            generalServices[0] = await GeneralServices(db).findById(id);
        }
    }
    return generalServices;
}