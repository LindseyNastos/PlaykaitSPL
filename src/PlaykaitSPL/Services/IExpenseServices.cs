using System.Collections.Generic;
using PlaykaitSPL.Models;

namespace PlaykaitSPL.Services
{
    public interface IExpenseServices
    {
        void AddNewExpense(CabinExpense exp);
        void EditExpense(CabinExpense exp);
        IList<CabinExpense> GetAllExpenses();
        CabinExpense GetExpenseDetails(int id);
        void HardDeleteExpense(int id);
        void SoftDeleteExpense(int id);
    }
}