using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedUserGoalRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "DietGoals",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DietGoals_AppUserId",
                table: "DietGoals",
                column: "AppUserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DietGoals_AspNetUsers_AppUserId",
                table: "DietGoals",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DietGoals_AspNetUsers_AppUserId",
                table: "DietGoals");

            migrationBuilder.DropIndex(
                name: "IX_DietGoals_AppUserId",
                table: "DietGoals");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "DietGoals");
        }
    }
}
