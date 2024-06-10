using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlastDeck.Migrations
{
    /// <inheritdoc />
    public partial class EnglishWord : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EnglishWord",
                table: "Cards",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7fd0965a-35f9-49e5-a7f5-def8e35f6d7f", "AQAAAAIAAYagAAAAEPw1HqbWxltlj3POebFl+P9AEl+8Fkm0k+/i8qiBfyVIz8ldLpwJ29pt+gTqclIG6w==", "aaa75ea1-5ffe-42d2-9f1a-a2213507856e" });

            migrationBuilder.UpdateData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 1,
                column: "EnglishWord",
                value: "Man");

            migrationBuilder.UpdateData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 2,
                column: "EnglishWord",
                value: "Woman");

            migrationBuilder.UpdateData(
                table: "UserAnswers",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateAnswered",
                value: new DateTime(2024, 6, 10, 11, 7, 11, 181, DateTimeKind.Local).AddTicks(1308));

            migrationBuilder.UpdateData(
                table: "UserAnswers",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateAnswered",
                value: new DateTime(2024, 6, 10, 11, 7, 11, 181, DateTimeKind.Local).AddTicks(1336));

            migrationBuilder.CreateIndex(
                name: "IX_Cards_CorrectAnswerId",
                table: "Cards",
                column: "CorrectAnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cards_Answers_CorrectAnswerId",
                table: "Cards",
                column: "CorrectAnswerId",
                principalTable: "Answers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cards_Answers_CorrectAnswerId",
                table: "Cards");

            migrationBuilder.DropIndex(
                name: "IX_Cards_CorrectAnswerId",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "EnglishWord",
                table: "Cards");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b320d483-7295-40a0-b586-b3a0558eca87", "AQAAAAIAAYagAAAAEBP8SUn6gs+b3Z12VVzAFArb/cchLY8Dw0tRYwpl4faVGRaFi6ZvMUNlkRm0hMEdjQ==", "ec3e44aa-8569-4669-b127-6672c7ad77e4" });

            migrationBuilder.UpdateData(
                table: "UserAnswers",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateAnswered",
                value: new DateTime(2024, 6, 7, 9, 46, 38, 260, DateTimeKind.Local).AddTicks(6945));

            migrationBuilder.UpdateData(
                table: "UserAnswers",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateAnswered",
                value: new DateTime(2024, 6, 7, 9, 46, 38, 260, DateTimeKind.Local).AddTicks(6961));
        }
    }
}
