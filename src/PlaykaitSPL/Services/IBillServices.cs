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
    }
}