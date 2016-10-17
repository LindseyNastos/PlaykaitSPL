using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models.HomeAwayAPIModels
{
    public class Payment
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public bool PayPal { get; set; }
        public bool Check { get; set; }
        public int CheckNumber { get; set; }
    }
}
