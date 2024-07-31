using BlastDeck.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BlastDeck.Data;

public class BlastDeckDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<Card> Cards { get; set; }
    public DbSet<Set> Sets { get; set; }
    public DbSet<UserAnswer> UserAnswers { get; set; }
    public DbSet<UserCard> UserCards { get; set; }
    public DbSet<UserCardSet> UserCardSets { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }

    public BlastDeckDbContext(DbContextOptions<BlastDeckDbContext> context, IConfiguration config)
        : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder
            .Entity<IdentityRole>()
            .HasData(
                new IdentityRole
                {
                    Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                    Name = "Admin",
                    NormalizedName = "admin"
                }
            );

        modelBuilder
            .Entity<IdentityUser>()
            .HasData(
                new IdentityUser
                {
                    Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                    UserName = "Administrator",
                    Email = "admina@strator.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(
                        null,
                        _configuration["AdminPassword"]
                    )
                }
            );

        modelBuilder
            .Entity<IdentityUserRole<string>>()
            .HasData(
                new IdentityUserRole<string>
                {
                    RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                    UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
                }
            );
        // Seed data
        modelBuilder
            .Entity<UserProfile>()
            .HasData(
                new UserProfile { Id = 1, IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" }
            );

        modelBuilder
            .Entity<Card>()
            .HasData(
                new Card
                {
                    Id = 1,
                    ImageURL = "https://example.com/image1.jpg",
                    CorrectAnswer = "איש",
                    CreatorId = 1,
                    EnglishWord = "Man",
                    AudioURL =
                        "https://he-audio.howtopronounce.com/543dbd9392c532f6f0b4310231031d40.mp3"
                },
                new Card
                {
                    Id = 2,
                    ImageURL = "https://example.com/image2.jpg",
                    CorrectAnswer = "אישה",
                    CreatorId = 1,
                    EnglishWord = "Woman",
                    AudioURL = "https://he-audio.howtopronounce.com/16960531936517b7c94aa04.mp3"
                }
            );

        modelBuilder
            .Entity<Set>()
            .HasData(
                new Set
                {
                    Id = 1,
                    SetName = "Basic Set",
                    CreatorId = 1
                },
                new Set
                {
                    Id = 2,
                    SetName = "Advanced Set",
                    CreatorId = 1
                }
            );

        modelBuilder
            .Entity<UserCard>()
            .HasData(
                new UserCard
                {
                    Id = 1,
                    UserId = 1,
                    CardId = 1
                },
                new UserCard
                {
                    Id = 2,
                    UserId = 1,
                    CardId = 2
                }
            );

        modelBuilder
            .Entity<UserCardSet>()
            .HasData(
                new UserCardSet
                {
                    Id = 1,
                    UserCardId = 1,
                    SetId = 1
                },
                new UserCardSet
                {
                    Id = 2,
                    UserCardId = 2,
                    SetId = 2
                }
            );

        modelBuilder
            .Entity<UserAnswer>()
            .HasData(
                new UserAnswer
                {
                    Id = 1,
                    UserCardId = 1,
                    AnsweredCorrectly = true,
                    Stage = 1,
                    DateAnswered = DateTime.Now
                },
                new UserAnswer
                {
                    Id = 2,
                    UserCardId = 2,
                    AnsweredCorrectly = false,
                    Stage = 1,
                    DateAnswered = DateTime.Now
                }
            );
    }
}
