using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjektArbete.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjektArbete.Controllers
{
    public class DataController : Controller
    {
        public IActionResult Index()
        {
            return Json(DataManager.GetAllPartyPercentage());
        }

        public IActionResult Person()
        {
            return Json(null);
        }

        public IActionResult Party()
        {
            return Json(null);
        }

        public IActionResult Constituency()
        {
            return Json(null);
        }
    }
}
