using PlaykaitSPL.Models;
using PlaykaitSPL.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Services
{
    public class ExpenseServices : IExpenseServices
    {
        private IGenericRepository _repo;
        public ExpenseServices(IGenericRepository repo)
        {
            _repo = repo;
        }

        //add pagination
        public IList<CabinExpense> GetAllExpenses()
        {
            var expenses = _repo.Query<CabinExpense>()
                .Where(e => e.IsActive == true)
                .ToList();
            return expenses;
        }

        public CabinExpense GetExpenseDetails(int id)
        {
            var expense = _repo.Query<CabinExpense>().FirstOrDefault(e => e.Id == id);
            return expense;
        }

        public void AddNewExpense(CabinExpense exp)
        {
            _repo.Add(exp);
        }

        public void EditExpense(CabinExpense exp)
        {
            _repo.Update(exp);
        }

        public void SoftDeleteExpense(int id)
        {
            var exp = _repo.Query<CabinExpense>().FirstOrDefault(e => e.Id == id);
            exp.IsActive = false;
            _repo.SaveChanges();
        }

        public void HardDeleteExpense(int id)
        {
            var exp = _repo.Query<CabinExpense>().FirstOrDefault(e => e.Id == id);
            _repo.Delete(exp);
        }

    }
}
