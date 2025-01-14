using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain.Blogs;
using Sabio.Models;
using Sabio.Models.Requests.Forum;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Forum;
using Sabio.Models.Domain;

namespace Sabio.Services
{
    public class ForumService : IForumService
    {
        IDataProvider _data = null;

        public ForumService(IDataProvider data) 
        {
            _data = data;
        }

        public int Add(ForumAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Forum_Insert]";
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

        public void Update(ForumUpdateRequest model)
        {
            string procName = "[dbo].[Forum_Update]";
            _data.ExecuteNonQuery
                (
                procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                },
                returnParameters: null
                );
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Forum_Delete]";
            _data.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                },
                returnParameters: null
                );
        }
        //SelectAllPaginated
        public Paged<Forum> Pagination(int pageIndex, int pageSize)
        {
            Paged<Forum> pagedList = null;
            List<Forum> list = null;
            string procName = "[dbo].[Forum_SelectPaginated]";
            int totalCount = 0;

            _data.ExecuteCmd
                (
                procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Forum forum = MapSingleForumPost(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Forum>();
                    }

                    list.Add(forum);
                }
                );

            if (list != null)
            {
                pagedList = new Paged<Forum>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public Paged<Forum> SearchPaginate(string query, int pageIndex, int pageSize)
        {
            Paged<Forum> pagedList = null;
            List<Forum> list = null;
            string procName = "[dbo].[Forum_Search]";
            int totalCount = 0;

            _data.ExecuteCmd
                (
                procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Query", query);
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Forum forum = MapSingleForumPost(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Forum>();
                    }

                    list.Add(forum);
                }
                );

            if (list != null)
            {
                pagedList = new Paged<Forum>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public Paged<Forum> SelectByCategory(int forumCategoryId, int pageIndex, int pageSize)
        {
            Paged<Forum> pagedList = null;
            List<Forum> list = null;
            string procName = "[dbo].[Forum_SelectByCategoryPaginated]";
            int totalCount = 0;

            _data.ExecuteCmd
                (
                procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@ForumCategoryId", forumCategoryId);
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Forum forum = MapSingleForumPost(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Forum>();
                    }

                    list.Add(forum);
                }


                ); 

            if (list != null)
            {
                pagedList = new Paged<Forum>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }


        public Paged<Forum> Search(string query, int pageIndex, int pageSize)
        {
            Paged<Forum> pagedList = null;
            List<Forum> list = null;
            string procName = "[dbo].[Forum_Search]";
            int totalCount = 0;

            _data.ExecuteCmd
                (
                procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Query", query);
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Forum forum = MapSingleForumPost(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Forum>();
                    }

                    list.Add(forum);
                }
                );

            if (list != null)
            {
                pagedList = new Paged<Forum>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public Forum GetById(int id)
        {
            string procName = "[dbo].[Forum_SelectById]";
            Forum aForum = null;
            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate(IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    aForum = MapSingleSearch(reader, ref startingIndex);
                }
            );
            return aForum;
        }

        private static Forum MapSingleSearch(IDataReader reader, ref int startingIndex)
        {
            Forum aForum = new Forum();
            aForum.ForumCategoryId = new LookUp();

            aForum.Id = reader.GetSafeInt32(startingIndex++);
            aForum.Name = reader.GetSafeString(startingIndex++);
            aForum.Description = reader.GetSafeString(startingIndex++);

            aForum.ForumCategoryId.Id = reader.GetSafeInt32(startingIndex++);
            aForum.ForumCategoryId.Name = reader.GetSafeString(startingIndex++);

            aForum.IsPrivate = reader.GetSafeBool(startingIndex++);
            aForum.IsClosed = reader.GetSafeBool(startingIndex++);
            aForum.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aForum.DateModified = reader.GetSafeDateTime(startingIndex++);
            aForum.AuthorInfo = reader.DeserializeObject<BaseUser>(startingIndex++);
            return aForum;
        }


        private static Forum MapSingleForumPost(IDataReader reader, ref int startingIndex)
        {
            Forum aForum = new Forum();
            aForum.ForumCategoryId = new LookUp();

            aForum.Id = reader.GetSafeInt32(startingIndex++);
            aForum.Name = reader.GetSafeString(startingIndex++);
            aForum.Description = reader.GetSafeString(startingIndex++);

            aForum.ForumCategoryId.Id= reader.GetSafeInt32(startingIndex++); 
            aForum.ForumCategoryId.Name = reader.GetSafeString(startingIndex++);

            aForum.IsPrivate = reader.GetSafeBool(startingIndex++);
            aForum.IsClosed = reader.GetSafeBool(startingIndex++);
            aForum.DateCreated=reader.GetSafeDateTime(startingIndex++);
            aForum.DateModified = reader.GetSafeDateTime(startingIndex++);
            aForum.AuthorInfo = reader.DeserializeObject<BaseUser>(startingIndex++);
            return aForum;
        }

        private static void AddCommonParams(ForumAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@ForumCategoryId", model.ForumCategoryId); 
            col.AddWithValue("@AuthorId", model.AuthorId);
            col.AddWithValue("@IsPrivate", model.IsPrivate);
        }
    }
}
