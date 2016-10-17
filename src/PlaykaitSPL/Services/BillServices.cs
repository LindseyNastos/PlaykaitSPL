using PlaykaitSPL.Models;
using PlaykaitSPL.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PlaykaitSPL.Services
{
    public class BillServices : IBillServices
    {
        private IGenericRepository _repo;
        public BillServices(IGenericRepository repo)
        {
            _repo = repo;
        }

        //add pagination
        public IList<CabinBill> GetAllBills()
        {
            var bills = _repo.Query<CabinBill>()
                .Where(b => b.IsActive == true)
                .Include(b => b.BillName)
                .ToList();
            return bills;
        }

        public CabinBill GetBillDetails(int id)
        {
            var bill = _repo.Query<CabinBill>().Include(b => b.BillName).FirstOrDefault(b => b.Id == id);
            return bill;
        }

        public void AddNewBill(CabinBill bill)
        {
            var billName = _repo.Query<BillName>().FirstOrDefault(n => n.Id == bill.BillName.Id);
            bill.BillName = billName;
            bill.DateEntered = DateTime.Now;
            _repo.Add(bill);
        }

        public void EditBill(CabinBill bill)
        {
            _repo.Update(bill);
        }

        public void SoftDeleteBill(int id)
        {
            var bill = _repo.Query<CabinBill>().FirstOrDefault(b => b.Id == id);
            bill.IsActive = false;
            _repo.SaveChanges();
        }

        public void HardDeleteBill(int id)
        {
            var bill = _repo.Query<CabinBill>().FirstOrDefault(b => b.Id == id);
            _repo.Delete(bill);
        }

        //FILTERS

        public IList<CabinBill> BillByMonth(int monthNum) {
            var bills = _repo.Query<CabinBill>()
                .Where(b => b.MonthNum == monthNum)
                .Where(b => b.IsActive == true)
                .Include(b => b.BillName)
                .ToList();
            return bills;
        }

        public IList<CabinBill> BillsByBill(int billNameId) {
            var bills = _repo.Query<CabinBill>()
                .Include(b => b.BillName)
                .Where(b => b.IsActive == true)
                .Where(b => b.BillName.Id == billNameId)
                .ToList();
            return bills;
        }

        //public IList<CabinBill> BillsByPrice() {

        //}

        public IList<CabinBill> UnpaidBills() {
            var bills = _repo.Query<CabinBill>()
                .Include(b => b.BillName)
                .Where(b => b.IsActive == true)
                .Where(b => b.Paid == false)
                .ToList();
            return bills;
        }

        public IList<CabinBill> DeletedBills() {
            var bills = _repo.Query<CabinBill>()
                .Include(b => b.BillName)
                .Where(b => b.IsActive == false)
                .ToList();
            return bills;
        }

    }
}
