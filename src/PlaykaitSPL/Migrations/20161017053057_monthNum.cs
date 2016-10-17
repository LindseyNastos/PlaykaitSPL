using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PlaykaitSPL.Migrations
{
    public partial class monthNum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MonthNum",
                table: "CabinExpenses",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MonthNum",
                table: "CabinBills",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MonthNum",
                table: "CabinExpenses");

            migrationBuilder.DropColumn(
                name: "MonthNum",
                table: "CabinBills");
        }
    }
}
