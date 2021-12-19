/**
 Khi chạy, vào link http://localhost:8000/api-docs/ để mở Swagger
 Khi thêm 1 api mới vào swagger cần làm:
 - Thêm đường dẫn vào phần path, thêm các trường thông tin tương tự như mẫu dưới đây
 - Thêm schema trong phần component, để hiển thị mẫu trong phần request body
 */
/**
 "đường dẫn": {
                    "post": {
                        "tags": [" tên"],
                        "summary": "hướng dẫn",
                        "operationId": "định danh",
                        "parameters": [],
                        "requestBody": {
                            "description": "mô tả",
                            "content": { //Tham chiếu tới schema
                                "application/json": {"schema": {"$ref": "#/components/schemas/Users"}},
                                "application/xml": {"schema": {"$ref": "#/components/schemas/Users"}}
                            },
                            "required": true
                        },
                        "responses": {
                            "200": {"description": "create_document_success"},
                            "401": {"description": "create_document_false", "content": {}}
                        },
                        "x-codegen-request-body-name": "body"
                    }
                },
 */

const swaggerJsonData =
    {
        "openapi": "3.0.3",
        "info": {
            "title": "Api NMCNMP",
            "description": "Chứa danh sách các Api và test",
            "contact": {"email": "minhctthvn2@gmail.com"},
            "version": "1.0.5"
        },
        "servers": [{"url": "http://localhost:8000"}],
        "tags": [ {
            "name": "Authentication",
            "description": "Api module Authentication"
        },{
            "name":"Admin",
            "description": "Api module Admin"
        }],
        "paths": {
            "/auth/login": {
                "post": {
                    "tags": ["Authentication"],
                    "summary": "Log in with role admin or super admin",
                    "operationId": "Login",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập thông tin tài khoản admin hoặc super admin",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/Users"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/Users"}}
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {"description": "login success"},
                        "401": {"description": "login false", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/auth/logout": {
                "post": {
                    "tags": ["Authentication"],
                    "summary": "Log out account",
                    "operationId": "LogoutAuth",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập thông tin tài khoản ",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/Logout DTO"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/Logout DTO"}}
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {"description": "logout success"},
                        "401": {"description": "logout false", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/homestays/ranking": {
                "get": {
                    "tags": ["Homestays"],
                    "summary": "Get top ${quantity} ranking homestays",
                    "operationId": "RankingHomestays",
                    "parameters": [{
                        "in": "query",
                        "name": "quantity",
                        "schema": {
                            "type": "integer"
                        },
                        "require": true
                    }],
                    "responses": {
                        "200": {"description": "get ranking homestays success"},
                        "401": {"description": "get ranking homestays false", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/homestays/rate/:id": {
                "post": {
                    "tags": ["Homestays"],
                    "summary": "Create new rate",
                    "operationId": "CreateRate",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập thông tin rate và id của homestay",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/Rate"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/Rate"}}
                        },
                        "x-codegen-request-body-name": "body"
                    },
                    "responses": {
                        "200": {"description": "Rate thành công "},
                        "401": {"description": "Rate không thành công ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                },
            },
            "/homestays/information/{id}": {
                "get": {
                    "tags": ["Homestays"],
                    "summary": "Get full infomation about a homestay with id",
                    "operationId": "getAHomestay",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "Nhập id của homestay cần lấy ra thông tin chi tiết",
                        "schema": {"type": "string"},
                        "require": true
                    }],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "lấy dữ liệu homestay thành công "},
                        "401": {"description": "id không đúng ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/homestays/filter": {
                "get": {
                    "tags": ["Homestays"],
                    "summary": "Filter homestays by information",
                    "operationId": "filterHomestays",
                    "parameters": [
                        {  "name": "province",
                            "in": "query",
                            "schema": {"type": "string"},
                           "require": false},
                        {
                            "name": "type",
                            "in": "query",
                            "schema": {"type": "string"},
                            "require": false},
                        {
                            "name": "averageRates",
                            "in": "query",
                            "schema": {"type": "number"},
                            "require": false},
                        {
                            "name": "amenities",
                            "in": "query",
                            "schema":{
                                "type":"array",
                                "items": {
                                    "type":"string",
                                },
                                "minItems":0
                            },
                            "require": false},
                        {
                            "name": "generalServices",
                            "in": "query",
                            "schema": {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                },
                                "minItems":0
                            },
                            "require": false},
                        {
                            "name": "minPrice",
                            "in": "query",
                            "schema": {"type": "number"},
                            "require": false},
                        {
                            "name": "maxPrice",
                            "in": "query",
                            "schema": {"type": "number"},
                            "require": false},
                        {
                            "name": "slice",
                            "in": "query",
                            "schema": {"type": "number"},
                            "require": false},
                    ],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "Filter thành công "},
                        "401": {"description": "Filter có lỗi ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/admins/update/homestays":{
                "put": {
                    "tags": ["Admin"],
                    "summary":"Update information in Homestay with _id",
                    "operationId":"updateHomestay",
                    "parameters":[],
                    "requestBody": {
                        "description": "Nhập thông tin homestay muốn thay đổi",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/UpdateHomestay"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/UpdateHomestay"}}
                        },
                    },
                    "responses": {
                        "200": {"description": "Update homestay success"},
                        "404": {"description": "Exception"},
                    },
                    "x-codegen-request-body-name": "body"
                },
            },
            "/admins/bills-of-admin/{id}": {
                "get": {
                    "tags": ["Admin"],
                    "summary": "Get bills of admin by admin 's id",
                    "operationId": "getBillsOfAdmin",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "Nhập id của admin cần lấy ra danh sách các bills",
                        "schema": {"type": "string"},
                        "require": true
                    }],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "lấy dữ liệu thành công "},
                        "401": {"description": "admin 's id không đúng ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/users/create/bills":{
                "post": {
                    "tags": ["User"],
                    "summary": "Create bill by user",
                    "operationId":"",
                    "parameter": [],
                    "requestBody":{
                        "description": "Bắt buộc nhập tất cả thông tin cá nhân của khách",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/CreateBill"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/CreateBill"}}
                        },
                    },
                    "responses": {
                        "200": {"description": "Create success"},
                        "404": {"description": "Exception","message":"Nhập thiếu hoặc sai thông tin 1 trường bắt buộc" },
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/admins/delete/bills": {
                "post": {
                    "tags": ["Admin"],
                    "summary": "Delete Bills by Admin by Bills 's id",
                    "operationId": "DeleteBills",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập _id của Bills cần xóa, bạn cần phải là admin thì mới xóa được",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/DeleteBill"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/DeleteBill"}}
                        },
                    },
                    "responses": {
                        "200": { "description": "Delete bill success"},
                        "403": { "description": "Bills is not exist"},
                        "401": { "description": "Exception", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/admins/update/bills":{
                "put": {
                    "tags": ["Admin"],
                    "summary": "Update Bills by admin",
                    "operationId": "updateBillsByAdmin",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập những trường cần cập nhật của bills",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/UpdateBill"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/UpdateBill"}}
                        },
                    },
                    "responses": {
                        "200": {"description": "Update bills thành công "},
                        "404": {"description": "Update bill không thành công", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/admins/bills-of-homestay/{id}": {
                "get": {
                    "tags": ["Admin"],
                    "summary": "Get bills of admin by Homestay 's id",
                    "operationId": "getBillsOfHomestay",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "Nhập id của Homestay cần lấy ra danh sách các bills",
                        "schema": {"type": "string"},
                        "require": true
                    }],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "lấy dữ liệu thành công "},
                        "404": {"description": "Homestay 's id không đúng ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            }
        },
        "components": {
            "schemas": {
                "Users": {
                    "type": "object", "properties": {
                        "email":  {"type": "string"},
                        "password": {"type": "string"},
                    }
                },
                "Logout DTO": {
                    "type": "object", "properties": {
                        "_id": {"type": "string"},
                    }
                },
                "Rate": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string"
                        },
                        "rate": {
                            "type": "object",
                            "properties": {
                                "cleanRate": {
                                    "type": "number"
                                },
                                "serviceRate": {
                                    "type": "number"
                                },
                                "valueRate": {
                                    "type": "number"
                                },
                                "accuracyRate": {
                                    "type": "number"
                                },
                                "description": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "UpdateHomestay":{
                    "type": "object", "properties":{
                        "_id":         {"type": "string"},
                        "name":        {"type": "string"},
                        "price":       {"type": "number"},
                        "type":        {"type": "string"},
                        "address":     {"type": "string"},
                        "province":    {"type": "string"},
                        "district":    {"type": "string"},
                        "latitude":    {"type": "string"},
                        "longitude":   {"type": "string"},
                        "area":        {"type": "number"},
                        "description": {"type": "string"},
                        "available":   {"type": "number"},
                        "services":{
                            "type":"array",
                            "items": {
                                "type": "string",
                            }
                        },
                        "generalServices":{
                            "type":"array",
                            "items": {
                                "type": "string",
                            }
                        },
                        "amenities":{
                            "items": {
                                "type": "string",
                            }
                        },
                        "photos":{
                            "type":"array",
                            "items": {
                                "type": "string",
                            }
                        }
                    }
                },
                "UpdateBill":{
                    "type": "object", "properties":{
                        "billId": {
                            "type": "string",
                        },
                        "customer":{
                            "type":"object",
                            "properties" :{
                                "name": {"type": "string"},
                                "identification": {"type": "string"},
                                "email": {"type": "string"},
                                "phoneNumber": {"type": "string"},
                                "age": {"type": "number"},
                            }
                        },
                        "customerTogether": {
                            "type":"array",
                            "items":{
                                "type": "object",
                                "properties":{
                                    "name":        {"type": "string"},
                                    "age":        {"type": "number"},
                                }
                            }
                        },
                        "homestayId": {"type": "string"},
                        "checkinDate": {"type": "string"},
                        "checkoutDate": {"type": "string"},
                        "status": {"type": "number"},
                        "servicesPerBill": {
                            "type":"array",
                            "items":{
                                "type": "object",
                                "properties":{
                                    "services":        {"type": "string"},
                                    "count":        {"type": "number"},
                                }
                            }
                        },
                    }
                },
                "CreateBill":{
                    "type": "object", "properties": {
                        "_id":                    {"type": "string"},
                        "customer": {
                            "type": "object", "properties": {
                                "name":           {"type": "string"},
                                "identification": {"type": "string"},
                                "email":          {"type": "string"},
                                "phoneNumber":    {"type": "string"},
                                "age":            {"type": "number"}
                            }
                        },
                        "customerTogether": {
                            "type": "array",
                            "items":{
                                "type": "object",
                                "properties": { 

                                    "name":       {"type": "string"},
                                    "age":        {"type": "number"}

                                }

                            }

                        },
                        "checkinDate":             {"type": "string"},
                        "checkoutDate":            {"type": "string"},
                        "servicesPerBill": { 
                            "type": "array","items": {

                                "type": "object","properties": {

                                    "services":    {"type": "string"}, 
                                    "count":       {"type": "number"} 
                                
                                }
                            
                            }
                        
                        }
                    }
                },
                "DeleteBill":{
                    "type": "object", "properties":{
                        "_id": {"type": "string"}
                    }
                }
            }, "securitySchemes": {"bearerAuth": {"type": "http", "scheme": "bearer", "bearerFormat": "JWT"}}
        },
        "security": [{"bearerAuth": []}]
    }

exports.swaggerJsonData = swaggerJsonData;

