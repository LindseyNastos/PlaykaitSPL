using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models.HomeAwayAPIModels
{
    public class PaymentSchedule
    {
        public PaymentSchedule()
        {
            PaymentScheduleItems = new List<PaymentScheduleItem>();
        }

        public int Id { get; set; }
        public ICollection<PaymentScheduleItem> PaymentScheduleItems { get; set; }
    }
}
