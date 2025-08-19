using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tipo_Datos.Data;
using Tipo_Datos.Models.Entidades;

namespace Tipo_Datos.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentasAPIController : ControllerBase
    {
        private readonly DatosDbContext _context;

        public VentasAPIController(DatosDbContext context)
        {
            _context = context;
        }

        // GET: api/VentasAPI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VentasModel>>> GetVentas()
        {
            return await _context.Ventas.ToListAsync();
        }

        // GET: api/VentasAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VentasModel>> GetVentasModel(int id)
        {
            var ventasModel = await _context.Ventas.FindAsync(id);

            if (ventasModel == null)
            {
                return NotFound();
            }

            return ventasModel;
        }

        // PUT: api/VentasAPI/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVentasModel(int id, VentasModel ventasModel)
        {
            if (id != ventasModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(ventasModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VentasModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/VentasAPI
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VentasModel>> PostVentasModel(VentasModel ventasModel)
        {
            _context.Ventas.Add(ventasModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVentasModel", new { id = ventasModel.Id }, ventasModel);
        }

        // DELETE: api/VentasAPI/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVentasModel(int id)
        {
            var ventasModel = await _context.Ventas.FindAsync(id);
            if (ventasModel == null)
            {
                return NotFound();
            }

            _context.Ventas.Remove(ventasModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VentasModelExists(int id)
        {
            return _context.Ventas.Any(e => e.Id == id);
        }
    }
}
