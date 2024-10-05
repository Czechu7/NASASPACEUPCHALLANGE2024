using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    // api/questions
    public class QuestionController : BaseApiController
    {
        private readonly DataContext _context;

        // Dependency Injection of DataContext
        public QuestionController(DataContext context)
        {
            _context = context;
        }

        // GET: api/questions
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            try
            {
                // Include Decisions in the query
                var questions = await _context.Question
                    .Include(q => q.Decisions) // Include related Decisions
                    .ToListAsync();

                return Ok(questions);
            }
            catch (Exception ex)
            {
                // Return a 500 status with error details
                return StatusCode(500, new { message = "An error occurred while retrieving the questions.", details = ex.Message });
            }
        }

        // GET: api/questions/{id}
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestionById(int id)
        {
            try
            {
                // Find the question by id and include related Decisions
                var question = await _context.Question
                    .Include(q => q.Decisions)
                    .FirstOrDefaultAsync(q => q.Id == id);

                if (question == null)
                {
                    return NotFound(new { message = "Question not found." });
                }

                return Ok(question);
            }
            catch (Exception ex)
            {
                // Return a 500 status with error details
                return StatusCode(500, new { message = "An error occurred while retrieving the question.", details = ex.Message });
            }
        }

        // POST: api/questions
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Question>> AddQuestion(Question question)
        {
            try
            {
                _context.Question.Add(question);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetQuestionById), new { id = question.Id }, question);
            }
            catch (Exception ex)
            {
                // Return a 500 status with error details
                return StatusCode(500, new { message = "An error occurred while saving the question.", details = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
