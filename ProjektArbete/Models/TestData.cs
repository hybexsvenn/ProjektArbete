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
            new PersonVM { Id = "1", FirstName = "Mikael", LastName = "Svenn", Constituency = "Trollhättan", ConstituencyNumber = "2", ParliamentaryYear = "2016/2017", Party = "V", Status = "Upptagen", Abscense = 3},
            new PersonVM { Id = "2", FirstName = "Veronica", LastName = "Röös", Constituency = "Göteborg", ConstituencyNumber = "1", ParliamentaryYear = "2016/2017", Party = "KD", Status = "Tjänstledig", Abscense = 4},
            new PersonVM { Id = "3", FirstName = "Pontus", LastName = "Lind", Constituency = "Göteborg", ConstituencyNumber = "1", ParliamentaryYear = "2016/2017", Party = "S", Status = "Upptagen", Abscense = 5}
        };

        internal static PersonVM[] GetPersons()
        {
            return listOfPerson.ToArray();
        }

        public static List<IndexVM> listOfPartyPercentage = new List<IndexVM>
        {
            new IndexVM { Party = "V", PercentageAbsence = 12.3f},
            new IndexVM { Party = "S", PercentageAbsence = 8.5f},
            new IndexVM { Party = "MP", PercentageAbsence = 7.6f},
            new IndexVM { Party = "C", PercentageAbsence = 4.6f},
            new IndexVM { Party = "L", PercentageAbsence = 8.6f},
            new IndexVM { Party = "KD", PercentageAbsence = 9.6f},
            new IndexVM { Party = "M", PercentageAbsence = 7.6f},
            new IndexVM { Party = "SD", PercentageAbsence = 22.6f},
        };

        public static List<IndexVM> listOfPartyPercentageTemp = new List<IndexVM>
        {
            new IndexVM { Party = "V", PercentageAbsence = 50f},
            new IndexVM { Party = "S", PercentageAbsence = 8.5f},
            new IndexVM { Party = "MP", PercentageAbsence = 7.6f},
            new IndexVM { Party = "C", PercentageAbsence = 4.6f},
            new IndexVM { Party = "L", PercentageAbsence = 8.6f},
            new IndexVM { Party = "KD", PercentageAbsence = 9.6f},
            new IndexVM { Party = "M", PercentageAbsence = 7.6f},
            new IndexVM { Party = "SD", PercentageAbsence = 22.6f},
        };

        public static List<PartyVM> listOfPartyData = new List<PartyVM>
        {
            new PartyVM {Party = "V", Vote = new Vote {Yes = 50, No = 3, Abscense = 4, Refrain = 4 } },
            new PartyVM {Party = "S", Vote = new Vote {Yes = 5, No = 3, Abscense = 4, Refrain = 4 } },
            new PartyVM {Party = "MP", Vote = new Vote {Yes = 5, No = 3, Abscense = 4, Refrain = 4 } },
            new PartyVM {Party = "C", Vote = new Vote {Yes = 5, No = 3, Abscense = 4, Refrain = 4 } },
            new PartyVM {Party = "L", Vote = new Vote {Yes = 5, No = 3, Abscense = 4, Refrain = 4 } },
            new PartyVM {Party = "KD", Vote = new Vote {Yes = 5, No = 3, Abscense = 4, Refrain = 4 } },
            new PartyVM {Party = "M", Vote = new Vote {Yes = 5, No = 3, Abscense = 4, Refrain = 4 } },
            new PartyVM {Party = "SD", Vote = new Vote {Yes = 5, No = 3, Abscense = 4, Refrain = 4 } },
        };
    }
}
