using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tipo_Datos.Data;
using Tipo_Datos.Models.Entidades;

namespace Tipo_Datos.Controllers
{
    public class ClientesController : Controller
    {
        private readonly DatosDbContext _dbContext;
        public ClientesController(DatosDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _dbContext.Clientes.ToListAsync());
        }

        public IActionResult Nuevo() {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> 
            Nuevo([Bind("Nombres,Email,Telefono,Direccion,Cedula_RUC," +
            "Create_At,Update_At,isDelete")] ClientesModel cliente)
        {
            if (ModelState.IsValid)
            {
                _dbContext.Add(cliente);
                await _dbContext.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return  View(cliente);
        }


    }
}


