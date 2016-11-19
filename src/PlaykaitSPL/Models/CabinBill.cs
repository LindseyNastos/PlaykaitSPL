using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models
{
    public class CabinBill
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Bill name field is required")]
        public BillName BillName { get; set; }
        [Required(ErrorMessage = "Amount field is required")]
        public decimal Amount { get; set; }
        public DateTime DateEntered { get; set; }
        public DateTime? DatePaid { get; set; }
        [Required(ErrorMessage = "Paid field is required")]
        public bool Paid { get; set; }
        public string ScannedImage { get; set; }
        public string Notes { get; set; }
        public bool IsActive { get; set; } = true;
        [Required(ErrorMessage = "Month number field is required")]
        public int MonthNum { get; set; }
        [Required(ErrorMessage = "Year field is required")]
        public int Year { get; set; }
    }
}
