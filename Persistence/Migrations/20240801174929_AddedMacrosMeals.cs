using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedMacrosMeals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "BetaCarotene",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Caffeine",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Calcium",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Cholesterol",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Fiber",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Folate",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Iron",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Magnesium",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "MonounsaturatedFattyAcids",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PolyunsaturatedFattyAcids",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Potassium",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Retinol",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SaturatedFattyAcids",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Sodium",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Sugars",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "VitaminA",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "VitaminB12",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "VitaminC",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "VitaminD",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "VitaminK",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Zinc",
                table: "Meals",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BetaCarotene",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Caffeine",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Calcium",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Cholesterol",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Fiber",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Folate",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Iron",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Magnesium",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "MonounsaturatedFattyAcids",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "PolyunsaturatedFattyAcids",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Potassium",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Retinol",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "SaturatedFattyAcids",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Sodium",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Sugars",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "VitaminA",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "VitaminB12",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "VitaminC",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "VitaminD",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "VitaminK",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Zinc",
                table: "Meals");
        }
    }
}
