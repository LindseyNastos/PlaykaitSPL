using System.Collections.Generic;
using PlaykaitSPL.Models;

namespace PlaykaitSPL.Services
{
    public interface IExpenseTypeServices
    {
        void AddNewType(ExpenseType type);
        void DeleteType(int id);
        void EditType(ExpenseType type);
        IList<ExpenseType> GetAllTypes();
    }
}