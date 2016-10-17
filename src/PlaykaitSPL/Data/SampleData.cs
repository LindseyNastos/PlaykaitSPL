using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using PlaykaitSPL.Models;
using System.Collections.Generic;

namespace PlaykaitSPL.Data
{
    public class SampleData
    {
        public async static Task Initialize(IServiceProvider serviceProvider)
        {
            var db = serviceProvider.GetService<ApplicationDbContext>();
            var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

            // Ensure db
            //db.Database.EnsureDeleted();
            db.Database.EnsureCreated();

            // Ensure Stephen (IsAdmin)
            var lindsey = await userManager.FindByNameAsync("Lindsey.Nastos@CoderCamps.com");
            if (lindsey == null)
            {
                // create user
                lindsey = new ApplicationUser
                {
                    UserName = "Lindsey.Nastos@CoderCamps.com",
                    Email = "Lindsey.Nastos@CoderCamps.com"
                };
                await userManager.CreateAsync(lindsey, "Secret123!");

                // add claims
                await userManager.AddClaimAsync(lindsey, new Claim("IsAdmin", "true"));
            }

            // Ensure Mike (not IsAdmin)
            var katie = await userManager.FindByNameAsync("Katie.SnoqualmiePassLodge@gmail.com");
            if (katie == null)
            {
                // create user
                katie = new ApplicationUser
                {
                    UserName = "Katie.SnoqualmiePassLodge@gmail.com",
                    Email = "Katie.SnoqualmiePassLodge@gmail.com"
                };
                await userManager.CreateAsync(katie, "Secret123!");
            }

            if (!db.ExpenseTypes.Any())
            {
                db.ExpenseTypes.AddRange(
                    new ExpenseType
                    {
                        Name = "Appliance"
                    },
                    new ExpenseType
                    {
                        Name = "Decor"
                    },
                    new ExpenseType
                    {
                        Name = "Maintenance"
                    },
                    new ExpenseType
                    {
                        Name = "Cleaning Supplies"
                    },
                    new ExpenseType
                    {
                        Name = "Vehicle"
                    },
                    new ExpenseType
                    {
                        Name = "Garage"
                    },
                    new ExpenseType
                    {
                        Name = "Misc"
                    }
                );
                db.SaveChanges();
            }

            if (!db.BillNames.Any())
            {
                db.BillNames.AddRange(
                    new BillName
                    {
                        Name = "Electricity"
                    },
                    new BillName
                    {
                        Name = "Water"
                    },
                    new BillName
                    {
                        Name = "Gas"
                    }
                );
                db.SaveChanges();
            }


            if (!db.CabinBills.Any())
            {
                db.CabinBills.AddRange(
                    new CabinBill {
                        BillName = db.BillNames.FirstOrDefault(n => n.Name == "Electricity"),
                        Amount = 78.04m,
                        MonthNum = 9,
                        DateEntered = new DateTime(2016, 8, 29),
                        Paid = false,
                        Notes = "Note: electricity",
                        IsActive = true
                    },
                    new CabinBill {
                        BillName = db.BillNames.FirstOrDefault(n => n.Name == "Water"),
                        Amount = 153.97m,
                        MonthNum = 10,
                        DateEntered = new DateTime(2016, 8, 15),
                        DatePaid = new DateTime(2016, 10, 04),
                        Paid = true,
                        Notes = "Note: water",
                        IsActive = true
                    },
                    new CabinBill {
                        BillName = db.BillNames.FirstOrDefault(n => n.Name == "Gas"),
                        Amount = 36.44m,
                        MonthNum = 9,
                        DateEntered = new DateTime(2016, 9, 29),
                        Paid = false,
                        Notes = "Note: gas",
                        IsActive = true
                    }
                );
                db.SaveChanges();
            }

            if (!db.CabinExpenses.Any())
            {
                db.CabinExpenses.AddRange(
                    new CabinExpense {
                        ExpenseName = "Coffee pot",
                        Amount = 98.99m,
                        DatePurchased = new DateTime(2016, 9, 02),
                        MonthNum = 9,
                        ExpenseType = db.ExpenseTypes.FirstOrDefault(e => e.Name == "Appliance"),
                        Notes = "Some notes here.",
                        IsActive = true
                    },
                    new CabinExpense {
                        ExpenseName = "Cat food",
                        Amount = 17.97m,
                        DatePurchased = new DateTime(2016, 9, 12),
                        MonthNum = 9,
                        ExpenseType = db.ExpenseTypes.FirstOrDefault(e => e.Name == "Garage"),
                        Notes = "Some notes here.",
                        IsActive = true
                    },
                    new CabinExpense {
                        ExpenseName = "Laundry deturgent",
                        Amount = 46.32m,
                        DatePurchased = new DateTime(2016, 8, 18),
                        MonthNum = 8,
                        ExpenseType = db.ExpenseTypes.FirstOrDefault(e => e.Name == "Cleaning Supplies"),
                        Notes = "Some notes here.",
                        IsActive = true
                    }
                );
                db.SaveChanges();
            }

            if (!db.Months.Any()) {
                db.Months.AddRange(
                    new Month {
                        MonthName = Month.Months.August,
                        Year = 2016,
                        CabinExpenses = new List<CabinExpense>() {
                            db.CabinExpenses.FirstOrDefault(c => c.ExpenseName == "Laundry deturgent")
                        },
                        Notes = "Some notes here."
                    },
                    new Month
                    {
                        MonthName = Month.Months.September,
                        Year = 2016,
                        CabinExpenses = new List<CabinExpense>() {
                            db.CabinExpenses.FirstOrDefault(c => c.ExpenseName == "Cat food"),
                            db.CabinExpenses.FirstOrDefault(c => c.ExpenseName == "Coffee pot")
                        },
                        CabinBills = new List<CabinBill>() {
                            db.CabinBills.FirstOrDefault(c => c.Notes == "Note: electricity")
                        },
                        Notes = "Some notes here."
                    },
                    new Month
                    {
                        MonthName = Month.Months.October,
                        Year = 2016,
                        CabinBills = new List<CabinBill>()
                        {
                            db.CabinBills.FirstOrDefault(c => c.Notes == "Note: water"),
                            db.CabinBills.FirstOrDefault(c => c.Notes == "Note: gas")
                        },
                        Notes = "Some notes here."
                    }
                );
                db.SaveChanges();
            }


        }

    }
}
