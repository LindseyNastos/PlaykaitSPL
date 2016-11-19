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
        public int MonthNum { get; set; }
        private string _monthName;
        public string MonthName {
            get {
                return _monthName;
            }
            set {
                var dict = new Dictionary<int, string>()
                {
                    { 1, "January" },
                    { 2, "February" },
                    { 3, "March" },
                    { 4, "April" },
                    { 5, "May" },
                    { 6, "June" },
                    { 7, "July" },
                    { 8, "August" },
                    { 9, "September" },
                    { 10, "October" },
                    { 11, "November" },
                    { 12, "December" },
                };
                _monthName = dict[MonthNum];
            }
        }
        
    //    Dictionary<string, int> d = new Dictionary<string, int>()
    //{
    //    {"cat", 2},
    //    {"dog", 1},
    //    {"llama", 0},
    //    {"iguana", -1}
    //};
        //public enum Months
        //{
        //    January = 1,
        //    February,
        //    March,
        //    April,
        //    May,
        //    June,
        //    July,
        //    August,
        //    September,
        //    October,
        //    November,
        //    December
        //}
        public string Notes { get; set; }
        public ICollection<CabinBill> CabinBills { get; set; }
        public ICollection<CabinExpense> CabinExpenses { get; set; }
    }
}
