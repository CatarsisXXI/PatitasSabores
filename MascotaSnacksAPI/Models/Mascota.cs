using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MascotaSnacksAPI.Models
{
    public class Mascota
    {
        [Key]
        public int MascotaID { get; set; }

        public int ClienteID { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Especie { get; set; } = string.Empty; // "Perro", "Gato"


        [StringLength(100)]
        public string? Raza { get; set; }

        public DateTime? FechaNacimiento { get; set; }

        [StringLength(50)]
        public string? Tamaño { get; set; } // "Pequeño", "Mediano", "Grande"

        public string? NotasAdicionales { get; set; }

        // Propiedad de navegación
        [ForeignKey("ClienteID")]
        public Cliente Cliente { get; set; } = null!;

    }
}
