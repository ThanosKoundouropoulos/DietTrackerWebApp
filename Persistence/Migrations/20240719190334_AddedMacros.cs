using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedMacros : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeightIns_AspNetUsers_AppUserId",
                table: "WeightIns");

            migrationBuilder.RenameColumn(
                name: "proteins",
                table: "Foods",
                newName: "Proteins");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Foods",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "fats",
                table: "Foods",
                newName: "Fats");

            migrationBuilder.RenameColumn(
                name: "carbs",
                table: "Foods",
                newName: "Carbs");

            migrationBuilder.RenameColumn(
                name: "calories",
                table: "Foods",
                newName: "Calories");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "WeightIns",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<double>(
                name: "BetaCarotene",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Caffeine",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Calcium",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Cholesterol",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Fiber",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Folate",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Iron",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Magnesium",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "MonounsaturatedFattyAcids",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PolyunsaturatedFattyAcids",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Potassium",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Retinol",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SaturatedFattyAcids",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Sodium",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Sugars",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "VitaminA",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "VitaminB12",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "VitaminC",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "VitaminD",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "VitaminK",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Zinc",
                table: "Foods",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddForeignKey(
                name: "FK_WeightIns_AspNetUsers_AppUserId",
                table: "WeightIns",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeightIns_AspNetUsers_AppUserId",
                table: "WeightIns");

            migrationBuilder.DropColumn(
                name: "BetaCarotene",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Caffeine",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Calcium",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Cholesterol",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Fiber",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Folate",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Iron",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Magnesium",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "MonounsaturatedFattyAcids",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "PolyunsaturatedFattyAcids",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Potassium",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Retinol",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "SaturatedFattyAcids",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Sodium",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Sugars",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "VitaminA",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "VitaminB12",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "VitaminC",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "VitaminD",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "VitaminK",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Zinc",
                table: "Foods");

            migrationBuilder.RenameColumn(
                name: "Proteins",
                table: "Foods",
                newName: "proteins");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Foods",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Fats",
                table: "Foods",
                newName: "fats");

            migrationBuilder.RenameColumn(
                name: "Carbs",
                table: "Foods",
                newName: "carbs");

            migrationBuilder.RenameColumn(
                name: "Calories",
                table: "Foods",
                newName: "calories");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "WeightIns",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WeightIns_AspNetUsers_AppUserId",
                table: "WeightIns",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
