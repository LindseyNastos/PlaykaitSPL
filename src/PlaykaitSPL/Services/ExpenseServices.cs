using PlaykaitSPL.Models;
using PlaykaitSPL.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
                .Include(e => e.ExpenseType)
                .OrderByDescending(e => e.DatePurchased)
                .ToList();
            return expenses;
        }

        public CabinExpense GetExpenseDetails(int id)
        {
            var expense = _repo.Query<CabinExpense>()
                .Include(e => e.ExpenseType)
                .FirstOrDefault(e => e.Id == id);
            return expense;
        }

        public void AddNewExpense(CabinExpense exp)
        {
            var expenseType = _repo.Query<ExpenseType>().FirstOrDefault(t => t.Id == exp.ExpenseType.Id);
            exp.ExpenseType = expenseType;
            exp.DateEntered = DateTime.Now;
            exp.MonthNum = exp.DatePurchased.Month;
            exp.Year = exp.DatePurchased.Year;
            _repo.Add(exp);

            var month = _repo.Query<Month>()
                .Where(m => m.Year == exp.Year)
                .Where(m => m.MonthNum == exp.MonthNum)
                .FirstOrDefault();
            if (month == null)
            {
                var newMonth = new Month()
                {
                    MonthNum = exp.MonthNum,
                    Year = exp.Year
                };
                _repo.Add(newMonth);
                newMonth.CabinExpenses.Add(exp);
            }
            else
            {
                month.CabinExpenses.Add(exp);
            }
            _repo.SaveChanges();
        }

        public void EditExpense(CabinExpense exp)
        {
            var expType = _repo.Query<ExpenseType>().FirstOrDefault(e => e.Id == exp.ExpenseType.Id);
            exp.ExpenseType = expType;
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

        //FILTERS

        public IList<CabinExpense> ExpensesByMonth(int monthNum)
        {
            var expenses = _repo.Query<CabinExpense>()
                .Where(b => b.MonthNum == monthNum)
                .Where(b => b.IsActive == true)
                .Include(b => b.ExpenseType)
                .ToList();
            return expenses;
        }

        public IList<CabinExpense> ExpensesByType(int expTypeId)
        {
            var expenses = _repo.Query<CabinExpense>()
                .Include(b => b.ExpenseType)
                .Where(b => b.IsActive == true)
                .Where(b => b.ExpenseType.Id == expTypeId)
                .ToList();
            return expenses;
        }

        public IList<CabinExpense> ExpensesByPrice(int min, int max)
        {
            var expenses = _repo.Query<CabinExpense>()
                .Include(b => b.ExpenseType)
                .Where(b => b.IsActive)
                .Where(b => b.Amount > min)
                .Where(b => b.Amount < max)
                .ToList();
            return expenses;
        }

        public IList<CabinExpense> DeletedExpenses()
        {
            var expenses = _repo.Query<CabinExpense>()
                .Include(b => b.ExpenseType)
                .Where(b => b.IsActive == false)
                .ToList();
            return expenses;
        }

        public CabinExpense RestoreDeletedExpense(int id)
        {
            var exp = _repo.Query<CabinExpense>()
                .FirstOrDefault(b => b.Id == id);
            exp.IsActive = true;
            _repo.SaveChanges();
            return exp;
        }

    }
}
