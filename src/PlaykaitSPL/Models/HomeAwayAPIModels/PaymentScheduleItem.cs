using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models.HomeAwayAPIModels
{
    public class PaymentScheduleItem
    {
        public PaymentScheduleItem()
        {
            PaymentLineItems = new List<PaymentLineItem>();
        }

        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime DueDate { get; set; }
        public bool Refundable { get; set; }
        public string Status { get; set; }
        public ICollection<PaymentLineItem> PaymentLineItems { get; set; }
    }
}
