using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models.HomeAwayAPIModels
{
    public class ReservationCancellationPolicy
    {
        public ReservationCancellationPolicy()
        {
            CancellationPolicyItems = new List<CancellationPolicyItem>();
        }

        public int Id { get; set; }
        public ICollection<CancellationPolicyItem> CancellationPolicyItems { get; set; }

    }
}
