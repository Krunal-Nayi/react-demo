using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class EmployeeController : ControllerBase
    {
        List<Employee> _Employees;
        Employee _Employee;

        public EmployeeController()
        {
            _Employees = new List<Employee>();
            _Employee = new Employee();

            //Profile Pictures
            _Employee.ProfilePics = new List<string>();
            _Employee.ProfilePics.Add("Test pic path");

            ///Roles
            _Employee.Roles = new List<string>();
            _Employee.Roles.Add("Admin");
            _Employee.Roles.Add("Employee");

            ///Teams
            _Employee.Teams = new List<string>();
            _Employee.Teams.Add("Creative");
            _Employee.Teams.Add("Management");
            _Employee.Teams.Add("Finance & Admin");
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult TestAPI()
        {
            return Ok("GetAllUsers Method is fine");
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult Employees(string search)
        {
            List<Employee> _resultData = new List<Employee>();

            if (!(_Employees.Count() > 0))
            {
                _Employees = new List<Employee>();
                _Employees.Add(new Employee
                {
                    EmployeeID = 1,
                    EmployeeName = "Jack Jackson",
                    Email = "jackj@affinityid.co.nz",
                    Address = "307 Brant Road",
                    City = "Auckland",
                    Role = "Admin",
                    Team = "Creative",
                    ProfilePic = "/img/jack.png"
                });
            }

            if (!string.IsNullOrEmpty(search))
            {
                _resultData = _Employees.Where(x => x.EmployeeName.Contains(search)).ToList();
            }

            _resultData = _Employees;

            return Ok(_resultData);
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult EmployeeByID(int id)
        {
            Employee resultData = new Employee();
            resultData = _Employees.Where(x => x.EmployeeID == id).FirstOrDefault();

            if (resultData == null)
                resultData = new Employee();

            return Ok(resultData);
        }

        [Route("[action]")]
        [HttpPost, HttpPut]
        public IActionResult SaveEmployees(Employee foRequestData)
        {
            if (_Employees != null)
                _Employees = new List<Employee>();

            int LatestEmployeeID = _Employees.OrderByDescending(x => x.EmployeeID).FirstOrDefault().EmployeeID + 1;
            foRequestData.EmployeeID = LatestEmployeeID;

            _Employees.Add(foRequestData);
            return Ok(foRequestData);
        }

        [Route("[action]")]
        [HttpDelete]
        public IActionResult DeleteEmployee(int id)
        {
            _Employees.Remove(_Employees.Find(x => x.EmployeeID == id));
            return Ok("Employee removed successfully!!");
        }
    }
}
