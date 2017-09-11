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
        DataManager dataManager;

        public HomeController(DataManager dataManager)
        {
            this.dataManager = dataManager;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Person(string id)
        {
            if (id == null)
            {
                return View();
            }

            var x = dataManager.GetOnePerson(id);

            return View(x);
        }

        public IActionResult Party()
        {
            return View();
        }

        public IActionResult Constituency()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ContactUs(MailVM modelView)
        {
            if (!ModelState.IsValid)
                return View();

            dataManager.SendEmail(modelView);

            //var temp = "Ditt meddelande har skickats!";

            //TempData["Mess"] = temp;

            //modelView.TempData = (string)TempData["Mess"];

            return View(modelView);
        }

        [HttpGet]
        public IActionResult ContactUs()
        {
            return View();
        }
    }
}
