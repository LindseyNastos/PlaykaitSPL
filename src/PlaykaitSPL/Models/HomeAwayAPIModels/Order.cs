using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models.HomeAwayAPIModels
{
    public class Order
    {
        public Order()
        {
            OrderItems = new List<OrderItem>();
        }
        public int Id { get; set; }
        public string Currency { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public PaymentSchedule PaymentSchedule { get; set; }
        public ReservationCancellationPolicy ReservationCancellationPolicy { get; set; }
        public string ReservationOrderState { get; set; }
        public Guid RawReservationOrderGuid { get; set; }


    }
}
