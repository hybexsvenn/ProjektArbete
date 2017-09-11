using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjektArbete.Models.ViewModels
{
    public class MailVM
    {
        [Required(ErrorMessage = "Skriv in ett namn!")]
        public string Name { get; set; }

        [Required(ErrorMessage ="Skriv in en e-post")]
        [EmailAddress(ErrorMessage ="Skriv in en riktig e-post")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Skriv in ett ämne")]
        public string Subject { get; set; }

        [Required(ErrorMessage = "Skriv in ett meddelande")]
        public string Message { get; set; }


        [Required(ErrorMessage = "Lär dig räkna!")]
        public bool Catchpa { get; set; }

        public string TempData { get; set; }

        public MailVM()
        {
            TempData = "Message";
        }


    }
}
