using System.Collections.Generic;
using PlaykaitSPL.Models;

namespace PlaykaitSPL.Services
{
    public interface IBillServices
    {
        void AddNewBill(CabinBill bill);
        void EditBill(CabinBill bill);
        IList<CabinBill> GetAllBills();
        CabinBill GetBillDetails(int id);
        void HardDeleteBill(int id);
        void SoftDeleteBill(int id);
        IList<CabinBill> BillByMonth(int monthNum);
        IList<CabinBill> BillsByBillName(int billNameId);
        IList<CabinBill> BillsByPaymentStatus(bool paymentStatus);
        IList<CabinBill> DeletedBills();
        CabinBill RestoreDeletedBill(int id);
        IList<CabinBill> BillsByPrice(int min, int max);
    }
}