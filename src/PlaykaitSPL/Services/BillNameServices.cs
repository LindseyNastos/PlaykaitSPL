using PlaykaitSPL.Models;
using PlaykaitSPL.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaykaitSPL.Services
{
    public class BillNameServices : IBillNameServices
    {
        private IGenericRepository _repo;
        public BillNameServices(IGenericRepository repo)
        {
            _repo = repo;
        }

        //add pagination
        public IList<BillName> GetAllBillNames()
        {
            var names = _repo.Query<BillName>().ToList();
            return names;
        }

        public void AddNewBillName(BillName name)
        {
            _repo.Add(name);
        }

        public void EditBillName(BillName name)
        {
            _repo.Update(name);
        }

        public void DeleteBillName(int id)
        {
            var name = _repo.Query<BillName>().FirstOrDefault(e => e.Id == id);
            _repo.Delete(name);
        }
    }
}
