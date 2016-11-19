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
        IList<CabinExpense> ExpensesByMonth(int monthNum);
        IList<CabinExpense> ExpensesByType(int expTypeId);
        IList<CabinExpense> ExpensesByPrice(int min, int max);
        IList<CabinExpense> DeletedExpenses();
        CabinExpense RestoreDeletedExpense(int id);
    }
}