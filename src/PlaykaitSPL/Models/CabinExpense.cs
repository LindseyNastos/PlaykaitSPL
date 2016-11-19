using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models
{
    public class CabinExpense
    {
        public int Id { get; set; }
        public string ExpenseName { get; set; }
        public ExpenseType ExpenseType { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateEntered { get; set; }
        public DateTime DatePurchased { get; set; }
        public string ScannedImage { get; set; }
        public string Notes { get; set; }
        public bool IsActive { get; set; } = true;
        public int MonthNum { get; set; }
        public int Year { get; set; }
    }
}
