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
    public class ExpensesController : Controller
    {
        private IExpenseServices _service;
        public ExpensesController(IExpenseServices service)
        {
            _service = service;
        }
        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            var expenses = _service.GetAllExpenses();
            return Ok(expenses);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var exp = _service.GetExpenseDetails(id);
            return Ok(exp);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]CabinExpense exp)
        {
            if (ModelState.IsValid)
            {
                if (exp.Id == 0)
                {
                    _service.AddNewExpense(exp);
                    return Created("/expenses/" + exp.Id, exp);
                }
                else
                {
                    _service.EditExpense(exp);
                }
            }
            return BadRequest(ModelState);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _service.SoftDeleteExpense(id);
        }
    }
}
