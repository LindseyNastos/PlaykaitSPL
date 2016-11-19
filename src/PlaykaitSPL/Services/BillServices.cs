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
                .OrderByDescending(b => b.DateEntered)
                .ToList();
            //foreach (var bill in bills) {
            //    if (bill.DatePaid.HasValue) {
            //        var date = bill.DatePaid.Value; 
            //    }
            //}
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

            var month = _repo.Query<Month>()
                .Where(m => m.Year == bill.Year)
                .Where(m => m.MonthNum == bill.MonthNum)
                .FirstOrDefault();
            if (month == null)
            {
                var newMonth = new Month()
                {
                    MonthNum = bill.MonthNum,
                    Year = bill.Year
                };
                _repo.Add(newMonth);
                newMonth.CabinBills.Add(bill);
            }
            else {
                month.CabinBills.Add(bill);
            }
            _repo.SaveChanges();
        }

        public void EditBill(CabinBill bill)
        {
            var billName = _repo.Query<BillName>().FirstOrDefault(e => e.Id == bill.BillName.Id);
            bill.BillName = billName;
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

        public IList<CabinBill> BillsByBillName(int billNameId) {
            var bills = _repo.Query<CabinBill>()
                .Include(b => b.BillName)
                .Where(b => b.IsActive == true)
                .Where(b => b.BillName.Id == billNameId)
                .ToList();
            return bills;
        }

        public IList<CabinBill> BillsByPrice(int min, int max)
        {
            var bills = _repo.Query<CabinBill>()
                .Include(b => b.BillName)
                .Where(b => b.IsActive)
                .Where(b => b.Amount > min)
                .Where(b => b.Amount < max)
                .ToList();
            return bills;
        }

        public IList<CabinBill> BillsByPaymentStatus(bool paymentStatus) {
            var bills = new List<CabinBill>();
            if (paymentStatus == false)
            {
                bills = _repo.Query<CabinBill>()
                    .Include(b => b.BillName)
                    .Where(b => b.IsActive == true)
                    .Where(b => b.Paid == false)
                    .ToList();
            }
            else if (paymentStatus == true) {
                bills = _repo.Query<CabinBill>()
                    .Include(b => b.BillName)
                    .Where(b => b.IsActive == true)
                    .Where(b => b.Paid == true)
                    .ToList();
            }
            return bills;
        }

        public IList<CabinBill> DeletedBills() {
            var bills = _repo.Query<CabinBill>()
                .Include(b => b.BillName)
                .Where(b => b.IsActive == false)
                .ToList();
            return bills;
        }

        public CabinBill RestoreDeletedBill(int id) {
            var bill = _repo.Query<CabinBill>()
                .FirstOrDefault(b => b.Id == id);
            bill.IsActive = true;
            _repo.SaveChanges();
            return bill;
        }

    }
}
