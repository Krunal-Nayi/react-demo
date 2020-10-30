import http from "../http-common";

class EmployeeDataService {
    getAll() {
        return http.get("/employee/Employees");
    }

    findByName(name) {
        return http.get(`/employee/Employees?search=${name}`);
    }

    get(id) {
        return http.get(`/employee/EmployeeByID?id=${id}`);
    }

    create(data) {
        return http.post("/employee/SaveEmployees", data);
    }

    update(id, data) {
        return http.post("/employee/SaveEmployees", data);
    }

    delete(id) {
        return http.delete(`/employee/DeleteEmployee?id=${id}`);
    }
}

export default new EmployeeDataService();