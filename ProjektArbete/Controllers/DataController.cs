using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjektArbete.Controllers
{
    public class DataController : Controller
    {
        [HttpPost]
        public IActionResult Person()
        {
            return Json(null);
        }

        [HttpPost]
        public IActionResult Party()
        {
            return Json(null);
        }

        [HttpPost]
        public IActionResult Constituency()
        {
            return Json(null);
        }
    }
}
