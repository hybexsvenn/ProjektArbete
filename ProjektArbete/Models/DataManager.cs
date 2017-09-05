using ProjektArbete.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjektArbete.Models
{
    public class DataManager
    {
        public static IndexVM[] GetAllPartyPercentage()
        {
            return TestData.listOfPartyPercentage.ToArray();
        }

        public static PartyVM GetPartyPercentage(string id)
        {

            return TestData.listOfPartyData
                .SingleOrDefault(p => p.Party == id);
        }

        internal static PersonVM[] GetAllPersons()
        {
            return TestData.listOfPerson.ToArray();
            //return TestData.GetPersons();
        }

        internal static IndexVM[] GetAllPartyPercentageTemp()
        {
            return TestData.listOfPartyPercentageTemp.ToArray();
        }
    }
}
