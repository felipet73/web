using Microsoft.EntityFrameworkCore;

namespace Tipo_Datos.Data
{
    public class DatosDbContext:DbContext
    {
        public DatosDbContext(DbContextOptions op):base(op)
        {
            
        }
    }
}
