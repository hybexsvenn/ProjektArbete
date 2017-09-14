using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjektArbete.Models;
using ProjektArbete.Models.ViewModels;
using System.Drawing;
using System.IO;
using static System.Net.Mime.MediaTypeNames;

namespace ProjektArbete.Controllers
{
    public class HomeController : Controller
    {
        DataManager dataManager;

        public HomeController(DataManager dataManager)
        {
            this.dataManager = dataManager;
        }

        public IActionResult Cookiepolicy()
        {
            return View();
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
            var amount = modelView.CatchpaNumber[0] + modelView.CatchpaNumber[1];
            var testValid = !ModelState.IsValid;
            if (amount != modelView.Catchpa)
                testValid = false;
            else
                testValid = true;
            if (!testValid)
            {
                TempData[modelView.TempDataFail] = "Räkna om... Hallå eller...";
                return View(modelView);
            }
            else
            {
                dataManager.SendEmail(modelView);
                TempData[modelView.TempDataSuccess] = "Ditt mail har skickats!";
            }

            return RedirectToAction(nameof(ContactUs));
        }

        public IActionResult Faq()
        {
            
            return View();
        }

        [HttpGet]
        public IActionResult ContactUs()
        {
            MailVM mailVM = new MailVM();
            mailVM.CatchpaNumber[0] = dataManager.RandomCatchpa()[0];
            mailVM.CatchpaNumber[1] = dataManager.RandomCatchpa()[1];

            //x = mailVM.CatchpaNumber;

            return View(mailVM);
        }
    }
}
