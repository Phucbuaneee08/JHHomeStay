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
                }
            },
            "components": {
                "schemas": {
                    "Users": {
                         "type": "object", "properties": {
                            "role": {"type": "string"},
                            "email":  {"type": "string"},
                            "password": {"type": "string"},
                        }
                    },
                    "Logout DTO": {
                        "type": "object", "properties": {
                            "_id": {"type": "string"},
                        }
                    }
                }, "securitySchemes": {"bearerAuth": {"type": "http", "scheme": "bearer", "bearerFormat": "JWT"}}
            },
            "security": [{"bearerAuth": []}]
    }
exports.swaggerJsonData = swaggerJsonData;

