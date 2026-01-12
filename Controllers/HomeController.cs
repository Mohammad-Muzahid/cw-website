using Microsoft.AspNetCore.Mvc;

namespace cw_website.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet("contact")]
        public IActionResult GetContactInfo()
        {
            var contactInfo = new
            {
                Email = "contact@cwwesbite.com",
                Phone = "+1 (123) 456-7890",
                Address = "123 Street Name, City, Country"
            };
            
            return Ok(contactInfo);
        }
        
        [HttpPost("contact")]
        public IActionResult SubmitContact([FromBody] ContactForm model)
        {
            // Process contact form submission
            // You can integrate with email service here
            
            return Ok(new { message = "Message received successfully!" });
        }
    }
    
    public class ContactForm
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}