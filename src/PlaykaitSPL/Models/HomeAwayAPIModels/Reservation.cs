using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Models.HomeAwayAPIModels
{
    public class Reservation
    {
        public Reservation()
        {
            Orders = new List<Order>();
        }

        public int Id { get; set; }
        public bool BookingCancelled { get; set; }

        public bool Active { get; set; }
        public string AvailabilityStatus { get; set; }
        public int CheckinTime { get; set; }
        public int CheckoutTime { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public int Pets { get; set; }
        public string Locale { get; set; }
        public ReservationDates ReservationDates { get; set; }
        //PaymentStatus maybe enum???
        //PARTIAL_PAID, EXTERNAL_SOR, UNPAID, PAID, OVERPAID
        public string ReservationPaymentStatus { get; set; }
        public string ReservationReferenceNumber { get; set; }
        public string Status { get; set; }
        public string TravelerNote { get; set; }
        public Contact Contact { get; set; }
        public ICollection<Order> Orders { get; set; }

        //manually enter
        // if time, auto generate code: month and day backwards with zeros
        public int EntranceCode { get; set; }


        public DateTime SignedRentalAgreementDate { get; set; }

        public Payment DamageDeposit { get; set; }
        public Payment RemainingRentalAmount { get; set; }
    }
}
