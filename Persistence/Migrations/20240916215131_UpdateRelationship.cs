using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DietGoalMeals");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Meals",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DietGoalId",
                table: "Meals",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Meals_AppUserId",
                table: "Meals",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_DietGoalId",
                table: "Meals",
                column: "DietGoalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_AspNetUsers_AppUserId",
                table: "Meals",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_DietGoals_DietGoalId",
                table: "Meals",
                column: "DietGoalId",
                principalTable: "DietGoals",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_AspNetUsers_AppUserId",
                table: "Meals");

            migrationBuilder.DropForeignKey(
                name: "FK_Meals_DietGoals_DietGoalId",
                table: "Meals");

            migrationBuilder.DropIndex(
                name: "IX_Meals_AppUserId",
                table: "Meals");

            migrationBuilder.DropIndex(
                name: "IX_Meals_DietGoalId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "DietGoalId",
                table: "Meals");

            migrationBuilder.CreateTable(
                name: "DietGoalMeals",
                columns: table => new
                {
                    MealId = table.Column<Guid>(type: "TEXT", nullable: false),
                    GoalId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Quantity = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DietGoalMeals", x => new { x.MealId, x.GoalId });
                    table.ForeignKey(
                        name: "FK_DietGoalMeals_DietGoals_GoalId",
                        column: x => x.GoalId,
                        principalTable: "DietGoals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DietGoalMeals_Meals_MealId",
                        column: x => x.MealId,
                        principalTable: "Meals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DietGoalMeals_GoalId",
                table: "DietGoalMeals",
                column: "GoalId");
        }
    }
}
