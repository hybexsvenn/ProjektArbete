using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjektArbete.Models.ViewModels
{
    public class IndexVM
    {
        public string Party { get; set; }
        public decimal PercentageAbsence { get; set; }
        public string Year { get; set; }
    }
}
