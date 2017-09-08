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
        DataManager dataManager;

        public ApiController(DataManager dataManager)
        {
            this.dataManager = dataManager;
        }

        public IndexVM[] Index()
        {
            return dataManager.GetAllPartyPercentage();
        }


        //public IndexVM[] IndexTemp(string id)
        //{
        //    return dataManager.GetAllPartyPercentage(id);
        //}

        public PersonVM[] Person()
        {
            return dataManager.GetAllPersons();
        }

        public PartyVM Party(string id)
        {
            return dataManager.GetPartyPercentage(id);
        }

        public IActionResult Constituency()
        {
            return Json(null);
        }
    }
}
