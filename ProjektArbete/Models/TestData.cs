using ProjektArbete.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjektArbete.Models
{
    public class TestData
    {
        public static List<PersonVM> listOfPerson = new List<PersonVM>();

        public TestData()
        {
            listOfPerson.Add( new PersonVM() { Id = "1", FirstName = "Mikael", LastName = "Svenn", Constituency = "Trollhättan", ConstituencyNumber = "2", ParliamentaryYear = "2016/2017", Party = "V", Status = "Upptagen", Vote = new Vote[] { Vote.Nej, Vote.Nej, Vote.Nej, Vote.Frånvarande, Vote.Avstår } });
            listOfPerson.Add( new PersonVM() { Id = "2", FirstName = "Veronica", LastName = "Röös", Constituency = "Göteborg", ConstituencyNumber = "1", ParliamentaryYear = "2016/2017", Party = "KD", Status = "Tjänstledig", Vote = new Vote[] { Vote.Ja, Vote.Frånvarande, Vote.Frånvarande, Vote.Frånvarande, Vote.Avstår } });
            listOfPerson.Add( new PersonVM() { Id = "3", FirstName = "Pontus", LastName = "Lind", Constituency = "Göteborg", ConstituencyNumber = "1", ParliamentaryYear = "2016/2017", Party = "S", Status = "Upptagen", Vote = new Vote[] { Vote.Nej, Vote.Frånvarande, Vote.Avstår, Vote.Avstår, Vote.Avstår } });

        }
    }
}
