using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models
{
    public class PaymentReminderEmail
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string SenderEmail { get; set; }
        public string RecipientEmail { get; set; }
        public DateTime DateToSendEmail { get; set; }
        public DateTime PaymentDueDate { get; set; }
        public decimal AmountOwed { get; set; }
    }
}
