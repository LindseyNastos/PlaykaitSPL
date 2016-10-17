using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models.HomeAwayAPIModels
{
    public class PaymentLineItem
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public Guid PaymentTransactionItemGuid { get; set; }
        //status: PENDING, SENT, COMPLETED, PAID
        public string Status { get; set; }
        public DateTime PaymentDate { get; set; }
        public bool Active { get; set; }
    }
}
