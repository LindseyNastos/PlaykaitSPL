using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlaykaitSPL.Services;
using PlaykaitSPL.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PlaykaitSPL.API
{
    [Route("api/[controller]")]
    public class BillsController : Controller
    {
        private IBillServices _service;
        public BillsController(IBillServices service)
        {
            _service = service;
        }
        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            var bills = _service.GetAllBills();
            return Ok(bills);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var bill = _service.GetBillDetails(id);
            return Ok(bill);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]CabinBill bill)
        {
            if (ModelState.IsValid)
            {
                if (bill.Id == 0)
                {
                    _service.AddNewBill(bill);
                    return Created("/bills/" + bill.Id, bill);
                }
                else
                {
                    _service.EditBill(bill);
                    return Ok(bill);
                }
            }
            return BadRequest(ModelState);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _service.SoftDeleteBill(id);
        }

        // FILTERS

        [HttpGet("BillsByMonth/{monthNum}")]
        public IActionResult BillByMonth(int monthNum)
        {
            var bills = _service.BillByMonth(monthNum);
            return Ok(bills);
        }

        [HttpGet("BillsByBillName/{billNameId}")]
        public IActionResult BillsByBillName(int billNameId)
        {
            var bills = _service.BillsByBillName(billNameId);
            return Ok(bills);
        }

        [HttpGet("BillsByPaymentStatus/{paymentStatus}")]
        public IActionResult BillsByPaymentStatus(bool paymentStatus)
        {
            var bills = _service.BillsByPaymentStatus(paymentStatus);
            return Ok(bills);
        }

        [HttpGet("DeletedBills")]
        public IActionResult DeletedBills()
        {
            var bills = _service.DeletedBills();
            return Ok(bills);
        }

        [HttpGet("RestoreDeletedBill/{id}")]
        public IActionResult RestoreDeletedBill(int id)
        {
            var bill = _service.RestoreDeletedBill(id);
            return Ok(bill);
        }

        [HttpGet("BillsByPrice/{min}/{max}")]
        public IActionResult BillsByPrice(int min, int max)
        {
            var bills = _service.BillsByPrice(min, max);
            return Ok(bills);
        }

    }
}
