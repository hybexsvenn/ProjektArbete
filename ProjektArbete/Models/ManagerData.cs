using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ProjektArbete.Models.Constituency;

namespace ProjektArbete.Models
{
    public class ManagerData
    {
        //static List<string> listForStockholm = new List<string>() {"Brännkyrka","Bromma","Enskede","Essinge","Farsta","Hägersten","Hässelby","Högalid","Kista","Kungsholmen",

        internal static string Stockholm(RootObject respons)
        {
            for (int i = 0; i < respons.results[0].address_components.Count - 1; i++)
            {
                for (int j = 0; j < respons.results[0].address_components[i].types.Count - 1; j++)
                {
                    if ("locality" == respons.results[0].address_components[i].types[j].ToLower())
                    {
                        if ("Stockholm" == respons.results[0].address_components[i].long_name)
                        {
                            return "Stockholms kommun";
                        }
                    }
                }
            }
            return "Stockholms län";
        }
        static List<string> VästraGötalandslänsöstra = new List<string>() { "Essunga", "Falköping", "Grästorp", "Gullspång", "Götene", "Hjo", "Karlsborg", "Lidköping", "Mariestad", "Skara", "Skövde", "Tibro", "Tidaholm", "Töreboda", "Vara" };
        internal static string Goteborg(RootObject respons)
        {
            for (int i = 0; i < respons.results[0].address_components.Count - 1; i++)
            {
                string str = respons.results[0].address_components[i].long_name.ToLower();
                for (int j = 0; j < VästraGötalandslänsöstra.Count; j++)
                {

                    if ("locality" == respons.results[0].address_components[i].types[0].ToLower())
                    {
                        if ("Stockholm" == respons.results[0].address_components[i].long_name)
                        {
                            return "Stockholms kommun";
                        }
                    }
                }
            }
            return "Stockholms län";
        }

    }
}
