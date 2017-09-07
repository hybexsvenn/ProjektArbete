using Microsoft.Extensions.Configuration;
using ProjektArbete.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ProjektArbete.Models
{

    public class DataManager
    {
        SqlConnection sqlConnection;

        public DataManager(IConfiguration configuration)
        {
            sqlConnection = new SqlConnection(configuration.GetConnectionString(""));
        }

        // string conString = @"Data Source=ACADEMY-7115T1S;Initial Catalog=ProjectFreedom;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        //public IndexVM[] GetAllPartyPercentage(string id)
        //{
        //    var fi = id.Split(";");



        //    List<IndexVM> listOfIndexVm = new List<IndexVM>();
        //    try
        //    {
        //        sqlConnection.Open();
        //        SqlCommand sqlCommand = new SqlCommand();
        //        sqlCommand.CommandText = "getPartyByYear";
        //        sqlCommand.CommandType = CommandType.StoredProcedure;
        //        sqlCommand.Connection = sqlConnection;
        //        sqlCommand.CommandTimeout = 90;

        //        InParam(sqlCommand, "@startDate", fi[0], 12, SqlDbType.VarChar);
        //        InParam(sqlCommand, "@endDate", fi[1], 12, SqlDbType.VarChar);
        //        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
        //        while (sqlDataReader.Read())
        //        {
        //            IndexVM indexVM = new IndexVM();
        //            indexVM.Party = (string)sqlDataReader["Party"];
        //            indexVM.PercentageAbsence = (decimal)sqlDataReader["Percentage"];
        //            listOfIndexVm.Add(indexVM);
        //        }
        //    }
        //    finally
        //    {
        //        sqlConnection.Close();
        //    }
        //    return listOfIndexVm.ToArray();
        //}

        public IndexVM[] GetAllPartyPercentage()
        {
            //var fi = id.Split(";");

            List<IndexVM> listOfIndexVm = new List<IndexVM>();
            try
            {
                sqlConnection.Open();
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.CommandText = "select * from Partiprocent";
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Connection = sqlConnection;
                // sqlCommand.CommandTimeout = 90;


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



        private void InParam(SqlCommand sqlCommand, string paramName, object value, int size, SqlDbType sqlDbType)
        {
            SqlParameter startDateParam = new SqlParameter();
            startDateParam.ParameterName = paramName;
            startDateParam.Size = size;
            startDateParam.SqlDbType = sqlDbType;
            startDateParam.Value = value;

            sqlCommand.Parameters.Add(startDateParam);
        }

        public PartyVM GetPartyPercentage(string id)
        {

            return TestData.listOfPartyData
                .SingleOrDefault(p => p.Party == id);
        }

        internal PersonVM[] GetAllPersons()
        {
            return TestData.listOfPerson.ToArray();
            //return TestData.GetPersons();
        }

        internal IndexVM[] GetAllPartyPercentageTemp()
        {
            return TestData.listOfPartyPercentageTemp.ToArray();
        }
    }
}
