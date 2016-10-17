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
    public class BillNamesController : Controller
    {
        private IBillNameServices _service;
        public BillNamesController(IBillNameServices service)
        {
            _service = service;
        }
        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            var names = _service.GetAllBillNames();
            return Ok(names);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]BillName name)
        {
            if (ModelState.IsValid)
            {
                if (name.Id == 0)
                {
                    _service.AddNewBillName(name);
                    return Created("/billNames/" + name.Id, name);
                }
                else
                {
                    _service.EditBillName(name);
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
            _service.DeleteBillName(id);
        }
    }
}
