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
        public DataManager dataManager;

        public ApiController(DataManager dataManager)
        {
            this.dataManager = dataManager;
        }

        public IndexVM[] Index()
        {
            return dataManager.GetAllPartyPercentage();
        }

        public PersonVM[] Person()
        {
            return dataManager.GetAllPersons();
        }

        public PersonVM[] SinglePerson(string id)
        {
            return dataManager.GetOnePerson(id);
        }

        public PartyVM[] Party(string id)
        {
            return dataManager.GetOneParty(id);
        }

        public IActionResult Constituency(string id)
        {
            return Json(null);
        }
    }
}
