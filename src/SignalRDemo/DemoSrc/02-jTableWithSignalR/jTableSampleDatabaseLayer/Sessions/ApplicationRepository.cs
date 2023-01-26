using System.Web;
using Hik.JTable.Repositories;
using Hik.JTable.Repositories.Memory;

namespace Hik.JTable.Sessions
{
    public static class ApplicationRepository
    {
        public static IRepositoryContainer GetRepository(RepositorySize size = RepositorySize.Medium, string repositoryKey = "common")
        {
            var appKey = "Repository_" + repositoryKey + "_" + size;

            if (HttpContext.Current.Application[appKey] == null)
            {
                HttpContext.Current.Application[appKey] = CreateRepository(size);
            }

            return HttpContext.Current.Application[appKey] as IRepositoryContainer;
        }

        private static IRepositoryContainer CreateRepository(RepositorySize size)
        {
            var studentCount = 10; //Default: Small
            switch (size)
            {
                case RepositorySize.Small:
                    studentCount = 10;
                    break;
                case RepositorySize.Medium:
                    studentCount = 128;
                    break;
                case RepositorySize.Large:
                    studentCount = 1024;
                    break;
            }

            return new MemoryRepositoryContainer(new MemoryDataGenerator().Generate(studentCount));
        }
    }
}