using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeAPI.Models
{
    public class Employee
    {
        public int EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public string ProfilePic { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Role { get; set; }
        public string Team { get; set; }

        public List<string> ProfilePics { get; set; }
        public List<string> Roles { get; set; }
        public List<string> Teams { get; set; }
    }
}
