using ProjektArbete.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjektArbete.Models
{
    public class TestData
    {
        public static List<PersonVM> listOfPerson = new List<PersonVM>
        {
            new PersonVM { Id = "1", FirstName = "Mikael", LastName = "Svenn", Constituency = "Trollhättan", ConstituencyNumber = "2", ParliamentaryYear = "2016/2017", Party = "V", Status = "Upptagen", Vote = new Vote[] { Vote.Nej, Vote.Nej, Vote.Nej, Vote.Frånvarande, Vote.Avstår } },
            new PersonVM { Id = "2", FirstName = "Veronica", LastName = "Röös", Constituency = "Göteborg", ConstituencyNumber = "1", ParliamentaryYear = "2016/2017", Party = "KD", Status = "Tjänstledig", Vote = new Vote[] { Vote.Ja, Vote.Frånvarande, Vote.Frånvarande, Vote.Frånvarande, Vote.Avstår } },
            new PersonVM { Id = "3", FirstName = "Pontus", LastName = "Lind", Constituency = "Göteborg", ConstituencyNumber = "1", ParliamentaryYear = "2016/2017", Party = "S", Status = "Upptagen", Vote = new Vote[] { Vote.Nej, Vote.Frånvarande, Vote.Avstår, Vote.Avstår, Vote.Avstår } }
        };

        internal static PersonVM[] GetPersons()
        {
            return listOfPerson.ToArray();
        }

        public static List<PartyVM> listOfPartyPercentage = new List<PartyVM>
        {
            new PartyVM { Party = "V", PercentageAbsence = 12.3f},
            new PartyVM { Party = "S", PercentageAbsence = 8.5f},
            new PartyVM { Party = "MP", PercentageAbsence = 7.6f},
            new PartyVM { Party = "C", PercentageAbsence = 4.6f},
            new PartyVM { Party = "L", PercentageAbsence = 8.6f},
            new PartyVM { Party = "KD", PercentageAbsence = 9.6f},
            new PartyVM { Party = "M", PercentageAbsence = 7.6f},
            new PartyVM { Party = "SD", PercentageAbsence = 22.6f},
        };


    }
}
