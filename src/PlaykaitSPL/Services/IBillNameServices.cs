using System.Collections.Generic;
using PlaykaitSPL.Models;

namespace PlaykaitSPL.Services
{
    public interface IBillNameServices
    {
        void AddNewBillName(BillName name);
        void DeleteBillName(int id);
        void EditBillName(BillName name);
        IList<BillName> GetAllBillNames();
    }
}