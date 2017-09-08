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
        //DataManager dataManager;

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Person(PersonVM[] viewModel)
        {
            List<PersonVM> listOfPerson = new List<PersonVM>
            {
                new PersonVM { Id = "1", FirstName = "Mikael", LastName = "Svenn", Constituency = "Trollhättan", ConstituencyNumber = "2", ParliamentaryYear = "2016/2017", Party = "V", Status = "Upptagen", Abscense = 3, Vote="Ja" },
                new PersonVM { Id = "2", FirstName = "Mikael", LastName = "Svenn", Constituency = "Trollhättan", ConstituencyNumber = "2", ParliamentaryYear = "2016/2017", Party = "V", Status = "Upptagen", Abscense = 3, Vote="Ja" },

            };
            viewModel = listOfPerson.ToArray();
            return View(viewModel);
        }


        public IActionResult Party()
        {
            return View(/*DataManager.GetAllPartyPercentage()*/);
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
