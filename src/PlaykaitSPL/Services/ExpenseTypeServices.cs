using PlaykaitSPL.Models;
using PlaykaitSPL.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Services
{
    public class ExpenseTypeServices : IExpenseTypeServices
    {
        private IGenericRepository _repo;
        public ExpenseTypeServices(IGenericRepository repo)
        {
            _repo = repo;
        }

        //add pagination
        public IList<ExpenseType> GetAllTypes()
        {
            var types = _repo.Query<ExpenseType>().ToList();
            return types;
        }

        public void AddNewType(ExpenseType type)
        {
            _repo.Add(type);
        }

        public void EditType(ExpenseType type)
        {
            _repo.Update(type);
        }

        public void DeleteType(int id)
        {
            var type = _repo.Query<CabinBill>().FirstOrDefault(e => e.Id == id);
            _repo.Delete(type);
        }
    }
}
