using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MascotaSnacksAPI.Data;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Linq;
using System;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace MascotaSnacksAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ChatbotController : ControllerBase
    {
        private readonly MascotaSnacksContext _context;
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public ChatbotController(MascotaSnacksContext context, HttpClient httpClient, IConfiguration configuration)
        {
            _context = context;
            _httpClient = httpClient;
            _configuration = configuration;
        }

        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] ChatRequest request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var mascotas = await _context.Mascotas.Where(m => m.ClienteID == userId).ToListAsync();
            var userName = User.FindFirst("name")?.Value ?? "Usuario";

            var systemContent = $"Eres un asistente amigable para una tienda de snacks para mascotas llamada Patitas y Sabores. El usuario {userName} tiene las siguientes mascotas: {string.Join(", ", mascotas.Select(m => $"{m.Nombre} ({m.Especie})"))}. Responde de manera personalizada y útil.";

            var openAiApiKey = _configuration["OpenAI:ApiKey"];
            if (string.IsNullOrEmpty(openAiApiKey))
            {
                return BadRequest("OpenAI API key not configured");
            }

            var openAiRequest = new
            {
                model = "gpt-4o-mini",
                messages = new[]
                {
                    new { role = "system", content = systemContent },
                    new { role = "user", content = request.Message }
                },
                max_tokens = 500
            };

            var json = JsonSerializer.Serialize(openAiRequest);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", openAiApiKey);

            try
            {
                var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    return BadRequest($"Error calling OpenAI API: {errorContent}");
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                var openAiResponse = JsonSerializer.Deserialize<OpenAiResponse>(responseContent);
                var aiMessage = openAiResponse?.Choices?.FirstOrDefault()?.Message?.Content;
                if (string.IsNullOrEmpty(aiMessage))
                {
                    aiMessage = "Lo siento, no pude generar una respuesta. Respuesta de OpenAI: " + responseContent;
                }

                return Ok(new { message = aiMessage });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }

    public class ChatRequest
    {
        public string Message { get; set; }
    }

    public class OpenAiResponse
    {
        [JsonPropertyName("choices")]
        public Choice[] Choices { get; set; }
    }

    public class Choice
    {
        [JsonPropertyName("message")]
        public Message Message { get; set; }
    }

    public class Message
    {
        [JsonPropertyName("content")]
        public string Content { get; set; }
    }
}
