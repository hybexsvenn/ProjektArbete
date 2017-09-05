using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjektArbete.Models;
using ProjektArbete.Models.ViewModels;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjektArbete.Controllers
{
    public class ApiController : Controller
    {
        public PartyVM[] Index()
        {
            return DataManager.GetAllPartyPercentage();
        }

        public PersonVM[] Person()
        {
            return DataManager.GetAllPersons();
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
