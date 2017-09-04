using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjektArbete.Models.ViewModels
{
    public enum Party
    {
        V,
        S,
        MP,
        L,
        M,
        SD,
        KD,
        C,
        FP
    }

    public enum Vote
    {
        Ja,
        Nej, 
        Avstår,
        Frånvarande
    }

    public class PersonVM
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Party Party { get; set; }
        public string Constituency { get; set; }
        public string ConstituencyNumber { get; set; }
        public Vote[] Vote { get; set; }
        public string ParliamentaryYear { get; set; }
        public string Status { get; set; }

    }
}
