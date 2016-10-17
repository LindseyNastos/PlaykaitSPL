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
    public class ExpenseTypesController : Controller
    {
        private IExpenseTypeServices _service;
        public ExpenseTypesController(IExpenseTypeServices service)
        {
            _service = service;
        }
        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            var types = _service.GetAllTypes();
            return Ok(types);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]ExpenseType type)
        {
            if (ModelState.IsValid)
            {
                if (type.Id == 0)
                {
                    _service.AddNewType(type);
                    return Created("/expenseTypes/" + type.Id, type);
                }
                else
                {
                    _service.EditType(type);
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
            _service.DeleteType(id);
        }
    }
}
