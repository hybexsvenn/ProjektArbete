using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjektArbete.Models;

namespace ProjektArbete.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Person()
        {
            return View(TestData.GetPersons());
        }

        public IActionResult Party()
        {
            return View();
        }

        public IActionResult Constituency()
        {
            return View();
        }
    }
}
