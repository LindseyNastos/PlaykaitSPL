using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models
{
    public class CabinExpense
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Expense name field is required")]
        public string ExpenseName { get; set; }
        [Required(ErrorMessage = "Expense type field is required")]
        public ExpenseType ExpenseType { get; set; }
        [Required(ErrorMessage = "Amount field is required")]
        public decimal Amount { get; set; }
        public DateTime DateEntered { get; set; }
        [Required(ErrorMessage = "Date purchased field is required")]
        public DateTime DatePurchased { get; set; }
        public string ScannedImage { get; set; }
        public string Notes { get; set; }
        public bool IsActive { get; set; } = true;
        public int MonthNum { get; set; }
        public int Year { get; set; }
    }
}
