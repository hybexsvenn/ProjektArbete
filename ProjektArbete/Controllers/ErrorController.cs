using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ProjektArbete.Controllers
{
    public class ErrorController : Controller
    {
        public IActionResult ErrorPage()
        {
            return View();
        }

        public IActionResult HttpError(int id)
        {
            return View(id);
        }
    }
}
