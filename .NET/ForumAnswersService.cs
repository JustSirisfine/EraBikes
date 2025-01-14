using Sabio.Data.Providers;
using Sabio.Models.Domain.Forum;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Services.Interfaces;
using Sabio.Models.Requests.Forum;

namespace Sabio.Services
{
    public class ForumAnswersService : IForumAnswersService
    {

        IDataProvider _data = null;
        public ForumAnswersService(IDataProvider data)
        {
            _data = data;
        }

        public ForumAnswers GetForumWithAnswersById(int forumId)
        {
            ForumAnswers forumAnswers = null;

            string procName = "[dbo].[Forum_SelectByIdV3]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper: (SqlParameterCollection paramCollection) =>
                {
                    paramCollection.AddWithValue("@Id", forumId);
                },
                singleRecordMapper: (IDataReader reader, short set) =>
                {
                    int startingIndex = 0;
                    forumAnswers = MapForumWithAnswers(reader, ref startingIndex);
                }
            );

            return forumAnswers;
        }

        public int AddAnswer(ForumAnswerAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[ForumAnswers_Insert]";
            _data.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCol)
                {
                    object oId = returnCol["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                }
                );
            return id;
        }

        private ForumAnswers MapForumWithAnswers(IDataReader reader, ref int startingIndex)
        {
            ForumAnswers forumAnswers = new ForumAnswers();

            forumAnswers.Id = reader.GetSafeInt32(startingIndex++);
            forumAnswers.Name = reader.GetSafeString(startingIndex++);
            forumAnswers.Description = reader.GetSafeString(startingIndex++);
            forumAnswers.ForumCategoryId = new LookUp
            {
                Id = reader.GetSafeInt32(startingIndex++),
                Name = reader.GetSafeString(startingIndex++)
            };
            forumAnswers.IsPrivate = reader.GetSafeBool(startingIndex++);
            forumAnswers.IsClosed = reader.GetSafeBool(startingIndex++);
            forumAnswers.DateCreated = reader.GetSafeDateTime(startingIndex++);
            forumAnswers.DateModified = reader.GetSafeDateTime(startingIndex++);
            forumAnswers.AuthorInfo = reader.DeserializeObject<BaseUser>(startingIndex++);
            forumAnswers.Answers = reader.DeserializeObject<List<Answer>>(startingIndex++); // Deserialize JSON into a list of answers


            return forumAnswers;
        }

        private static void AddCommonParams(ForumAnswerAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@AnswerTitle", model.AnswerTitle);
            col.AddWithValue("@AnswerDescription", model.AnswerDescription);
            col.AddWithValue("@AnswerAuthorId", model.AnswerAuthorId);
            col.AddWithValue("@AnswerThreadId", model.AnswerThreadId);
        }

    }
}