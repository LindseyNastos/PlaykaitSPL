using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models.HomeAwayAPIModels
{
    public class Contact
    {
        public int Id { get; set; }
        public bool Active { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        //Manually enter:
        public string StreetAddress { get; set; }
        public string Unit { get; set; }
        public string Email { get; set; }
    }
}
