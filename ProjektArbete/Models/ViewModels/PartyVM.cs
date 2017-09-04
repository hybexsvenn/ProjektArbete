using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjektArbete.Models.ViewModels
{
    public class PartyVM
    {
        public Party Party { get; set; }
        public PersonVM[] Members { get; set; }
        public Vote[] Vote { get; set; }
        public string Constituency { get; set; }
        public string ConstituencyNumber { get; set; }
        public string ParliamentaryYear { get; set; }
        public string Status { get; set; }
    }
}
