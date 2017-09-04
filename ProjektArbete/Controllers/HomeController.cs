using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjektArbete.Models;
using ProjektArbete.Models.ViewModels;

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
            return View(DataManager.GetAllPartyPercentage());
        }

        public IActionResult Constituency()
        {
            return View();
        }

        //public IActionResult GetPartialView(int id)
        //{
        //    //var model = DataManager.GetCustomerbyId(id);


        //    return PartialView("_DataBox", model);
        //}
    }
}
