using ProjektArbete.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ProjektArbete.Models
{

    public static class DataManager
    {
        static string conString = @"Data Source=ACADEMY-7115T1S;Initial Catalog=ProjectFreedom;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        static SqlConnection sqlConnection = new SqlConnection(conString);

        public static IndexVM[] GetAllPartyPercentage()
        {
            List<IndexVM> listOfIndexVm = new List<IndexVM>();
            try
            {
                sqlConnection.Open();
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.CommandText = "getPartyByYear";
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Connection = sqlConnection;
                InParam(sqlCommand, "@startDate", "2016", 12, SqlDbType.VarChar);
                InParam(sqlCommand, "@endDate", "2017", 12, SqlDbType.VarChar);
                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    IndexVM indexVM = new IndexVM();
                    indexVM.Party = (string)sqlDataReader["Party"];
                    indexVM.PercentageAbsence = (decimal)sqlDataReader["Percentage"];
                    listOfIndexVm.Add(indexVM);
                }
            }
            finally
            {
                sqlConnection.Close();
            }
            return listOfIndexVm.ToArray();
        }

        private static void InParam(SqlCommand sqlCommand, string paramName, object value, int size, SqlDbType sqlDbType)
        {
            SqlParameter startDateParam = new SqlParameter();
            startDateParam.ParameterName = paramName;
            startDateParam.Size = size;
            startDateParam.SqlDbType = sqlDbType;
            startDateParam.Value = value;

            sqlCommand.Parameters.Add(startDateParam);
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
