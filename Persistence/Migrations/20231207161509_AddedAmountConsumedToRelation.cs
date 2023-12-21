using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedAmountConsumedToRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "amountConsumed",
                table: "Foods");

            migrationBuilder.AddColumn<double>(
                name: "amountConsumed",
                table: "DietGoalFoods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "amountConsumed",
                table: "DietGoalFoods");

            migrationBuilder.AddColumn<double>(
                name: "amountConsumed",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
