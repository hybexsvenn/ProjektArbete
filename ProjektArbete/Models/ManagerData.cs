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

        static string[] VästraGötalandslänsöstra = new string[] { "Essunga", "Falköping", "Grästorp", "Gullspång", "Götene", "Hjo", "Karlsborg", "Lidköping", "Mariestad", "Skara", "Skövde", "Tibro", "Tidaholm", "Töreboda", "Vara" };
        static string[] VästraGötalandslänsnorra = new string[] { "Ale", "Alingsås", "Bengtsfors", "Dals - Ed", "Färgelanda", "Herrljunga", "Lerum", "Lilla Edet", "Mellerud", "Trollhättan", "Vårgårda", "Vänersborg", "Åmål" };
        static string[] VästraGötalandslänssödra = new string[] { "Bollebygd", "Borås", "Mark", "Svenljunga", "Tranemo", "Ulricehamn" };
        static string[] VästraGötalandslänsvästra = new string[] { "Härryda", "Kungälv", "Lysekil", "Munkedal", "Mölndal", "Orust", "Partille", "Sotenäs", "Stenungsund", "Strömstad", "Tanum", "Tjörn", "Uddevalla", "Öckerö" };

        internal static string Göteborg(RootObject respons)
        {
            for (int i = 0; i < respons.results[0].address_components.Count - 1; i++)
            {
                string str = respons.results[0].address_components[i].long_name;
                for (int j = 0; j < VästraGötalandslänsöstra.Length - 1; j++)
                {
                    if (str == VästraGötalandslänsöstra[j])
                    {
                        return "Västra Götalands läns östra";
                    }
                }
                for (int j = 0; j < VästraGötalandslänsnorra.Length - 1; j++)
                {
                    if (str == VästraGötalandslänsnorra[j])
                    {
                        return "Västra Götalands läns norra";
                    }
                }
                for (int j = 0; j < VästraGötalandslänssödra.Length - 1; j++)
                {
                    if (str == VästraGötalandslänssödra[j])
                    {
                        return "Västra Götalands läns södra";
                    }
                }
                for (int j = 0; j < VästraGötalandslänsvästra.Length - 1; j++)
                {
                    if (str == VästraGötalandslänsvästra[j])
                    {
                        return "Västra Götalands läns västra";
                    }
                }
            }
            return "Göteborgs kommun";
        }

        static string[] Skånelänsnorraochöstra = new string[] {"Bromölla","Båstad","Hässleholm","Klippan","Kristianstad","Osby","Perstorp","Simrishamn","Tomelilla","Åstorp","Ängelholm","Örkelljunga","Östra Göinge" };
        static string[] Skånelänssödra = new string[] { "Burlöv", "Kävlinge", "Lomma", "Lund", "Sjöbo", "Skurup", "Staffanstorp", "Svedala", "Trelleborg", "Vellinge", "Ystad" };
        static string[] Skånelänsvästra = new string[] { "Bjuv", "Eslöv", "Helsingborg", "Höganäs", "Hörby", "Höör", "Landskrona", "Svalöv" };

        internal static string Malmö(RootObject respons)
        {
            for (int i = 0; i < respons.results[0].address_components.Count - 1; i++)
            {
                string str = respons.results[0].address_components[i].long_name;
                for (int j = 0; j < Skånelänsnorraochöstra.Length - 1; j++)
                {
                    if (str == Skånelänsnorraochöstra[j])
                    {
                        return "Skåne läns norra och östra";
                    }
                }
                for (int j = 0; j < Skånelänssödra.Length - 1; j++)
                {
                    if (str == Skånelänssödra[j])
                    {
                        return "Skåne läns södra";
                    }
                }
                for (int j = 0; j < Skånelänsvästra.Length - 1; j++)
                {
                    if (str == Skånelänsvästra[j])
                    {
                        return "Skåne läns västra";
                    }
                }
            }
            return "Malmö kommun";
        }
    }
}
