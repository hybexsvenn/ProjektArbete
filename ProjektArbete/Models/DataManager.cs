using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using ProjektArbete.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ProjektArbete.Models
{

    public class DataManager
    {
        IConfiguration configuration;
        SqlConnection sqlConnection;

        public DataManager(IConfiguration configuration)
        {
            this.configuration = configuration;
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

        public void SendEmail(MailVM mailVM)
        {
            string toAddress = configuration["epost"];
            string fromAddress = configuration["epost"];
            string subject = mailVM.Subject;
            //string message = mailVM.Message + "\nAnkommande epost: "+ mailVM.Email;
            var message = new StringBuilder();
            message.Append($"Name: {mailVM.Name}\n");
            message.Append($"Email: {mailVM.Email}\n");
            message.Append($"Message:  {mailVM.Message} \n\n");
            message.Append(mailVM.Message);


            var mail = new MailMessage();
            var smtpClient = new SmtpClient(configuration["smtpserver"], int.Parse(configuration["port"]));

         

            try
            {
                using (mail)
                {
                    string email = configuration["epost"];
                    string password = configuration["password"];

                    var loginInfo = new NetworkCredential(email, password);

                    mail.From = new MailAddress(fromAddress);
                    mail.To.Add(new MailAddress(toAddress));
                    mail.Subject = subject;
                    mail.Body = message.ToString();
                    mail.IsBodyHtml = true;

                    try
                    {
                        using (smtpClient)
                        {
                            smtpClient.EnableSsl = true;
                            smtpClient.UseDefaultCredentials = false;
                            smtpClient.Credentials = loginInfo;
                            smtpClient.Send(mail);
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
                        Thread.Sleep(5000);
                        smtpClient.Send(mail);
                    }

                }
            }
        }

        internal MailVM RandomTwoNumbers(MailVM mailVM)
        {
            mailVM.CatchpaNumber[0] = RandomCatchpa()[0];
            mailVM.CatchpaNumber[1] = RandomCatchpa()[1];

            return mailVM;

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

        //public bool CatchpaRandom(MailVM mailVM)
        //{
        //    var temp = RandomCatchpa()[0] + RandomCatchpa()[1];

        //    if (temp == mailVM.Catchpa)
        //        return true;
        //    else
        //        return false;
        //}

        public int[] RandomCatchpa()
        {
            var randomOne = random.Next(1, 100);
            var randomTwo = random.Next(1, 100);
            var amount = randomOne + randomTwo;
            int[] randomNumbers = { randomOne, randomTwo };

            return randomNumbers;
        }

        static Random random = new Random();

    }
}
