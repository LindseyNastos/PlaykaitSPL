using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models.HomeAwayAPIModels
{
    public class CancellationPolicyItem
    {
        public int Id { get; set; }
        public decimal? Amount { get; set; }
        public DateTime Deadline { get; set; }
        public int PercentPenalty { get; set; }
    }
}
