using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlaykaitSPL.Repos;
using PlaykaitSPL.Models;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PlaykaitSPL.API
{
    [Route("api/[controller]")]
    public class MonthsController : Controller
    {
        private IGenericRepository _repo;
        public MonthsController(IGenericRepository repo)
        {
            _repo = repo;
        }
        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            var months = _repo.Query<Month>()
                .Include(m => m.CabinBills)
                .Include(m => m.CabinExpenses)
                .ToList();
            return Ok(months);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
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
        }
    }
}
