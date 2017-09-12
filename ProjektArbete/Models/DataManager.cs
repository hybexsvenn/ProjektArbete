using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ProjektArbete.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static ProjektArbete.Models.Constituency;

namespace ProjektArbete.Models
{

    public class DataManager
    {
        SqlConnection sqlConnection;

        public DataManager(IConfiguration configuration)
        {
            sqlConnection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
        }

        internal PartyVM[] GetOneParty(string id)
        {
            List<PartyVM> listOfparty = new List<PartyVM>();
            try
            {
                sqlConnection.Open();
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.CommandText = "GetDataParti";
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Connection = sqlConnection;

                InParam(sqlCommand, "@parti", id, 5, SqlDbType.NVarChar);

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    PartyVM party = new PartyVM();
                    party.Party = (string)sqlDataReader["parti"];
                    party.Vote = (string)sqlDataReader["rost"];
                    party.Year = (string)sqlDataReader["rm"];
                    party.PercentageAbsence = (decimal)sqlDataReader["Procent"];
                    listOfparty.Add(party);
                }
            }
            finally
            {
                sqlConnection.Close();
            }
            return listOfparty.ToArray();

        }

        internal string[] GetConstituencys()
        {
            List<string> c = new List<string>();
            try
            {
                sqlConnection.Open();
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.CommandText = "SELECT DISTINCT valkrets from Constituencyprocent order by valkrets";
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Connection = sqlConnection;

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    string t = (string)sqlDataReader["valkrets"];
                    c.Add(t);
                }
            }
            finally
            {
                sqlConnection.Close();
            }
            return c.ToArray();
        }

        public void SendEmail(MailVM mailVM)
        {
            string toAddress = "test@svenn.se";
            string fromAddress = "test@svenn.se";
            string subject = mailVM.Subject;
            //string message = mailVM.Message + "\nAnkommande epost: "+ mailVM.Email;
            var message = new StringBuilder();
            message.Append($"Name: {mailVM.Name}\n");
            message.Append($"Email: {mailVM.Email}\n");
            message.Append($"Message:  {mailVM.Message} \n\n");
            message.Append(mailVM.Message);


            try
            {
                using (var mail = new MailMessage())
                {
                    const string email = "test@svenn.se";
                    const string password = "Password1234_";

                    var loginInfo = new NetworkCredential(email, password);


                    mail.From = new MailAddress(fromAddress);
                    mail.To.Add(new MailAddress(toAddress));
                    mail.Subject = subject;
                    mail.Body = message.ToString();
                    mail.IsBodyHtml = true;

                    try
                    {
                        using (var smtpClient = new SmtpClient("send.one.com", 587))
                        {
                            smtpClient.EnableSsl = true;
                            smtpClient.UseDefaultCredentials = false;
                            smtpClient.Credentials = loginInfo;
                            smtpClient.Send(mail);

                            //var tEmail = new Thread(() => smtpClient.Send(mail));
                            //tEmail.Start();


                        }
                    }

                    finally
                    {
                        mail.Dispose();
                    }

                }
            }
            catch (SmtpFailedRecipientsException ex)
            {
                foreach (SmtpFailedRecipientException t in ex.InnerExceptions)
                {
                    var status = t.StatusCode;
                    if (status == SmtpStatusCode.MailboxBusy ||
                        status == SmtpStatusCode.MailboxUnavailable)
                    {
                        //Response.Write("Delivery failed - retrying in 5 seconds.");
                        System.Threading.Thread.Sleep(5000);
                        //resend
                        //smtpClient.Send(message);
                    }
                    else
                    {
                        //Response.Write("Failed to deliver message to {0}", t.FailedRecipient);
                    }
                }
            }
            //catch (SmtpException)
            //{
            //    // handle exception here
            //    //Response.Write(Se.ToString());
            //}

            //catch (Exception)
            //{
            //    //Response.Write(ex.ToString());
            //}

        }

        public IndexVM[] GetAllPartyPercentage()
        {
            List<IndexVM> listOfIndexVm = new List<IndexVM>();
            try
            {
                sqlConnection.Open();
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.CommandText = "select * from partiprocent order by(case parti when 'v' then 1 when 's' then 2 when 'mp' then 3 when 'c' then 4 when 'l' then 5 when 'kd' then 6 when 'm' then 7 when 'sd' then 8 else 100 end)";
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Connection = sqlConnection;

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    IndexVM indexVM = new IndexVM();
                    indexVM.Party = (string)sqlDataReader["Parti"];
                    indexVM.PercentageAbsence = (decimal)sqlDataReader["Procent frånvaro"];
                    indexVM.Year = (string)sqlDataReader["Riksdagsår"];
                    listOfIndexVm.Add(indexVM);
                }
            }
            finally
            {
                sqlConnection.Close();
            }
            return listOfIndexVm.ToArray();
        }

        public PersonVM[] GetAllPersons()
        {
            List<PersonVM> listOfPersons = new List<PersonVM>();
            try
            {
                sqlConnection.Open();
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.CommandText = "select intressent_id,fornamn,efternamn,parti from Personprocent";
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Connection = sqlConnection;

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    PersonVM personVM = new PersonVM();
                    personVM.Id = (string)sqlDataReader["intressent_id"];
                    personVM.FirstName = (string)sqlDataReader["fornamn"];
                    personVM.LastName = (string)sqlDataReader["efternamn"];
                    personVM.Party = (string)sqlDataReader["parti"];

                    var x = listOfPersons.FirstOrDefault(c => c.Id == personVM.Id);

                    if (x == null)
                    {
                        listOfPersons.Add(personVM);
                    }
                    else
                    {

                        if (personVM.Id != x.Id)
                        {
                            listOfPersons.Add(personVM);

                        }
                    }
                }
            }
            finally
            {
                sqlConnection.Close();
            }

            return listOfPersons.ToArray();
        }

        public PartyVM GetPartyPercentage(string id)
        {

            return TestData.listOfPartyData
                .SingleOrDefault(p => p.Party == id);
        }

        private void InParam(SqlCommand sqlCommand, string paramName, object value, int size, SqlDbType sqlDbType)
        {
            SqlParameter startDateParam = new SqlParameter();
            startDateParam.ParameterName = paramName;
            startDateParam.Size = size;
            startDateParam.SqlDbType = sqlDbType;
            startDateParam.Value = value;

            sqlCommand.Parameters.Add(startDateParam);
        }

        public PersonVM[] GetOnePerson(string intressent_id)
        {
            List<PersonVM> listOfPersonVM = new List<PersonVM>();
            try
            {
                sqlConnection.Open();
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.CommandText = "GetDataPerson";
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Connection = sqlConnection;

                InParam(sqlCommand, "@intressent_id", intressent_id, 20, SqlDbType.NVarChar);

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    PersonVM personVM = new PersonVM();
                    personVM.Id = (string)sqlDataReader["intressent_id"];
                    personVM.FirstName = (string)sqlDataReader["fornamn"];
                    personVM.LastName = (string)sqlDataReader["efternamn"];
                    personVM.Party = (string)sqlDataReader["parti"];
                    personVM.Constituency = (string)sqlDataReader["valkrets"];
                    personVM.Vote = (string)sqlDataReader["rost"];
                    personVM.ParliamentaryYear = (string)sqlDataReader["rm"];
                    personVM.Abscense = (decimal)sqlDataReader["Procent"];
                    listOfPersonVM.Add(personVM);
                }
            }
            finally
            {
                sqlConnection.Close();
            }
            return listOfPersonVM.ToArray();
        }

        static List<string> länList = new List<string> { "Blekinge län", "Dalarnas län", "Gotlands län", "Gävleborgs län", "Hallands län", "Jämtlands län", "Jönköpings län", "Kalmar län", "Kronobergs län", "Norrbottens län", "Södermanlands län", "Uppsala län", "Värmlands län", "Västerbottens län", "Västernorrlands län", "Västmanlands län", "Örebro län", "Östergötlands län", "Stockholms län" };
        internal async Task<string> GetGoeLocAsync(string latlong)
        {
            RootObject respons;
            string latitud;
            string longitud;
            var array = latlong.Split(';');
            if (array.Length == 2)
            {
                latitud = array[0];
                longitud = array[1];
                string URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitud + ", " + longitud + "&key=AIzaSyARnEQlD02wVjT3Vs-kKEmEyT_jR5ymZcA";
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(URL);
                var request = await client.GetAsync(URL);
                var content = await request.Content.ReadAsStringAsync();
                respons = JsonConvert.DeserializeObject<RootObject>(content);
                if (respons.status.ToLower() == "ok")
                {
                    for (int i = 0; i < respons.results[0].address_components.Count - 1; i++)
                    {
                        string str = respons.results[0].address_components[i].long_name.ToLower();
                        for (int j = 0; j < länList.Count; j++)
                        {
                            if (str == länList[j].ToLower())
                            {
                                return länList[j];
                            }
                        }
                    }

                    
                }
            }
            return null;
        }

        internal ConstituencyVM[] GetConstituency(string Constituency)
        {
            List<ConstituencyVM> constituencyVM = new List<ConstituencyVM>();
            try
            {
                sqlConnection.Open();
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.CommandText = "GetDataConstituency";
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Connection = sqlConnection;

                InParam(sqlCommand, "@constituency", Constituency, 100, SqlDbType.NVarChar);

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    ConstituencyVM constituency = new ConstituencyVM();
                    constituency.Constituency = (string)sqlDataReader["valkrets"];
                    constituency.PercentageAbsence = (decimal)sqlDataReader["Procent"];
                    constituency.Vote = (string)sqlDataReader["rost"];
                    constituency.Year = (string)sqlDataReader["rm"];
                    constituencyVM.Add(constituency);
                }
            }
            finally
            {
                sqlConnection.Close();
            }
            return constituencyVM.ToArray();
        } 

        //public PersonVM[] GetFirstochDefaultIntressent_Id()
        //{
        //    //GetAllPersons();
        //    //PersonVM personVM = new PersonVM();
        //    //listOfPersons.FirstOrDefault
        //    //listOfPersons.Add(personVM);
        //    //return listOfPersons.ToArray();
        //}

        //internal IndexVM[] GetAllPartyPercentageTemp()
        //{
        //    return TestData.listOfPartyPercentageTemp.ToArray();
        //}
    }

    internal class Constituency
    {
        public class AddressComponent
        {
            public string long_name { get; set; }
            public string short_name { get; set; }
            public List<string> types { get; set; }
        }

        public class Northeast
        {
            public double lat { get; set; }
            public double lng { get; set; }
        }

        public class Southwest
        {
            public double lat { get; set; }
            public double lng { get; set; }
        }

        public class Bounds
        {
            public Northeast northeast { get; set; }
            public Southwest southwest { get; set; }
        }

        public class Location
        {
            public double lat { get; set; }
            public double lng { get; set; }
        }

        public class Northeast2
        {
            public double lat { get; set; }
            public double lng { get; set; }
        }

        public class Southwest2
        {
            public double lat { get; set; }
            public double lng { get; set; }
        }

        public class Viewport
        {
            public Northeast2 northeast { get; set; }
            public Southwest2 southwest { get; set; }
        }

        public class Geometry
        {
            public Bounds bounds { get; set; }
            public Location location { get; set; }
            public string location_type { get; set; }
            public Viewport viewport { get; set; }
        }

        public class Result
        {
            public List<AddressComponent> address_components { get; set; }
            public string formatted_address { get; set; }
            public Geometry geometry { get; set; }
            public string place_id { get; set; }
            public List<string> types { get; set; }
        }

        public class RootObject
        {
            public List<Result> results { get; set; }
            public string status { get; set; }
        }
    }
}
