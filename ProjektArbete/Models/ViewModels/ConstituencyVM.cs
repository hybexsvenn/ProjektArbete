using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjektArbete.Models.ViewModels
{
    public class ConstituencyVM
    {
        public string Constituency { get; set; }
        public string Vote { get; set; }
        public decimal PercentageAbsence { get; set; }
        public string Year { get; set; }
    }
}
