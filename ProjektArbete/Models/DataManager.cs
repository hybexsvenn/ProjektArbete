using ProjektArbete.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjektArbete.Models
{
    public class DataManager
    {
        public static PartyVM[] GetAllPartyPercentage()
        {
            return TestData.listOfPartyPercentage.ToArray();
        }

        internal static PersonVM[] GetAllPersons()
        {
            return TestData.listOfPerson.ToArray();
            //return TestData.GetPersons();
        }
    }
}
