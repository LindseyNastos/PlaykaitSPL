using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models.HomeAwayAPIModels
{
    public class OrderItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal PreTaxAmount { get; set; }
        public string QuoteItemType { get; set; }
        public decimal TotalAmount { get; set; }
        //FeeType: DEPOSIT, RENTAL, MISC
        public string FeeType { get; set; }
    }
}
