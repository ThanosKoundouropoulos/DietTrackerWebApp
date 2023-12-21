using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class GoalFoodsRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DietGoalFoods",
                columns: table => new
                {
                    GoalId = table.Column<Guid>(type: "TEXT", nullable: false),
                    FoodId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DietGoalFoods", x => new { x.FoodId, x.GoalId });
                    table.ForeignKey(
                        name: "FK_DietGoalFoods_DietGoals_GoalId",
                        column: x => x.GoalId,
                        principalTable: "DietGoals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DietGoalFoods_Foods_FoodId",
                        column: x => x.FoodId,
                        principalTable: "Foods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DietGoalFoods_GoalId",
                table: "DietGoalFoods",
                column: "GoalId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DietGoalFoods");
        }
    }
}
