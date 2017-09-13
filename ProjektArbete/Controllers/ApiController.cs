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

        public QuestionsVM[] Faq()
        {
            return dataManager.Questions();
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

        public async Task<IActionResult> ConstituencyAsync(string id)
        {
            ConstituencyWrapper constituencyWrapper = new ConstituencyWrapper();
            var constituency = await dataManager.GetGoeLocAsync(id);
            if (constituency != null)
            {
                constituencyWrapper.constituencyVM = dataManager.GetConstituency(constituency);
            }
            constituencyWrapper.ConstituencyList = dataManager.GetConstituencys();

            return Json(constituencyWrapper);
        }
    }
}
