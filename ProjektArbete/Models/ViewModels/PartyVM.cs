using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjektArbete.Models.ViewModels
{
    public class PartyVM
    {
        public string Party { get; set; }
        public Vote Vote { get; set; }
    }

    public class Vote
    {
        public int Yes { get; set; }
        public int No { get; set; }
        public int Refrain { get; set; }
        public int Abscense { get; set; }
    }
}
