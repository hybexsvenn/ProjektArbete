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
        public float PercentageAbsence { get; set; }
    }
}
