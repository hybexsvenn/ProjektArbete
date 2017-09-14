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

        [Required(ErrorMessage = "Skriv in en e-post")]
        [EmailAddress(ErrorMessage = "Skriv in en riktig e-post")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Skriv in ett ämne")]
        public string Subject { get; set; }

        [Required(ErrorMessage = "Skriv in ett meddelande")]
        public string Message { get; set; }

        [Required]
        public int? Catchpa { get; set; }

        public int[] CatchpaNumber { get; set; }

        public string TempDataFail { get; set; }
        public string TempDataSuccess { get; set; }

        public MailVM()
        {
            CatchpaNumber = new int[2];
            TempDataFail = "MessageFailed";
            TempDataSuccess = "MessageSuccess";
        }
    }
}
