using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models
{
    public class Month
    {
        public Month()
        {
            CabinBills = new List<CabinBill>();
            CabinExpenses = new List<CabinExpense>();
        }

        public int Id { get; set; }
        public int Year { get; set; }
        public Months MonthName { get; set; }
        public enum Months {
            January,
            February,
            March,
            April,
            May,
            June,
            July,
            August,
            September,
            October,
            November,
            December
        }
        public string Notes { get; set; }
        public ICollection<CabinBill> CabinBills { get; set; }
        public ICollection<CabinExpense> CabinExpenses { get; set; }
    }
}
