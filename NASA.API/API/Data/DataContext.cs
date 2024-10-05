using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext // Poprawiona składnia
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) // Typ DbContextOptions
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Decisions> Decisions { get; set; }
        public DbSet<Question> Question { get; set; } // Zmienione na Questions (liczba mnoga)

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Konfiguracja relacji jeden-do-wielu
            modelBuilder.Entity<Question>()
                .HasMany(q => q.Decisions)
                .WithOne(d => d.Question)
                .HasForeignKey(d => d.QuestionId)
                .OnDelete(DeleteBehavior.Cascade); // Ustala, co się stanie, gdy pytanie zostanie usunięte
        }
    }
}
