import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface SqlResult {
  rows: Record<string, any>[];
  columns: string[];
}

@Injectable({ providedIn: 'root' })
export class SqlExecutorService {
  initialized = signal(false);

  private platformId = inject(PLATFORM_ID);
  private alasql: any = null;

  async initialize(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.initialized()) return;

    // alasql is loaded as a global script (angular.json scripts array)
    const alasql = (window as any)['alasql'];
    if (!alasql) throw new Error('alasql not loaded');
    this.alasql = alasql;

    // ── Drop & recreate tables ──────────────────────────────
    for (const t of ['OrderDetails','Orders','Products','Categories','Suppliers','Customers','Employees','Shippers']) {
      try { alasql(`DROP TABLE IF EXISTS ${t}`); } catch {}
    }

    alasql(`CREATE TABLE Customers (
      CustomerID INT, CustomerName STRING, ContactName STRING,
      Address STRING, City STRING, PostalCode STRING, Country STRING)`);

    alasql(`CREATE TABLE Suppliers (
      SupplierID INT, SupplierName STRING, ContactName STRING,
      Address STRING, City STRING, PostalCode STRING, Country STRING, Phone STRING)`);

    alasql(`CREATE TABLE Categories (
      CategoryID INT, CategoryName STRING, Description STRING)`);

    alasql(`CREATE TABLE Products (
      ProductID INT, ProductName STRING, SupplierID INT, CategoryID INT,
      Unit STRING, Price FLOAT)`);

    alasql(`CREATE TABLE Employees (
      EmployeeID INT, LastName STRING, FirstName STRING, BirthDate STRING,
      Photo STRING, Notes STRING)`);

    alasql(`CREATE TABLE Shippers (
      ShipperID INT, ShipperName STRING, Phone STRING)`);

    alasql(`CREATE TABLE Orders (
      OrderID INT, CustomerID INT, EmployeeID INT, OrderDate STRING, ShipperID INT)`);

    alasql(`CREATE TABLE OrderDetails (
      OrderDetailID INT, OrderID INT, ProductID INT, Quantity INT)`);

    // ── Customers ───────────────────────────────────────────
    const customers = [
      [1,'Alfreds Futterkiste','Maria Anders','Obere Str. 57','Berlin','12209','Germany'],
      [2,'Ana Trujillo Emparedados','Ana Trujillo','Avda. de la Constitución 2222','México D.F.','05021','Mexico'],
      [3,'Antonio Moreno Taquería','Antonio Moreno','Mataderos 2312','México D.F.','05023','Mexico'],
      [4,'Around the Horn','Thomas Hardy','120 Hanover Sq.','London','WA1 1DP','UK'],
      [5,'Berglunds snabbköp','Christina Berglund','Berguvsvägen 8','Luleå','S-958 22','Sweden'],
      [6,'Blauer See Delikatessen','Hanna Moos','Forsterstr. 57','Mannheim','68306','Germany'],
      [7,'Blondel père et fils','Frédérique Citeaux','24, place Kléber','Strasbourg','67000','France'],
      [8,'Bólido Comidas preparadas','Martín Sommer','C/ Araquil, 67','Madrid','28023','Spain'],
      [9,'Bon app\'','Laurence Lebihan','12, rue des Bouchers','Marseille','13008','France'],
      [10,'Bottom-Dollar Marketse','Elizabeth Lincoln','23 Tsawassen Blvd.','Tsawassen','T2F 8M4','Canada'],
      [11,'B\'s Beverages','Victoria Ashworth','Fauntleroy Circus','London','EC2 5NT','UK'],
      [12,'Cactus Comidas para llevar','Patricio Simpson','Cerrito 333','Buenos Aires','1010','Argentina'],
      [13,'Centro comercial Moctezuma','Francisco Chang','Sierras de Granada 9993','México D.F.','05022','Mexico'],
      [14,'Chop-suey Chinese','Yang Wang','Hauptstr. 29','Bern','3012','Switzerland'],
      [15,'Comércio Mineiro','Pedro Afonso','Av. dos Lusíadas, 23','São Paulo','05432-043','Brazil'],
    ];
    for (const c of customers) {
      alasql(`INSERT INTO Customers VALUES (${c[0]},'${c[1]}','${c[2]}','${c[3]}','${c[4]}','${c[5]}','${c[6]}')`);
    }

    // ── Suppliers ───────────────────────────────────────────
    const suppliers = [
      [1,'Exotic Liquid','Charlotte Cooper','49 Gilbert St.','London','EC1 4SD','UK','(171) 555-2222'],
      [2,'New Orleans Cajun Delights','Shelley Burke','P.O. Box 78934','New Orleans','70117','USA','(100) 555-4822'],
      [3,'Grandma Kelly\'s Homestead','Regina Murphy','707 Oxford Rd.','Ann Arbor','48104','USA','(313) 555-5735'],
      [4,'Tokyo Traders','Yoshi Nagase','9-8 Sekimai Musashino-shi','Tokyo','100','Japan','(03) 3555-5011'],
      [5,'Cooperativa de Quesos \'Las Cabras\'','Antonio del Valle Saavedra','Calle del Rosal 4','Oviedo','33007','Spain','(98) 598 76 54'],
    ];
    for (const s of suppliers) {
      alasql(`INSERT INTO Suppliers VALUES (${s[0]},'${s[1]}','${s[2]}','${s[3]}','${s[4]}','${s[5]}','${s[6]}','${s[7]}')`);
    }

    // ── Categories ──────────────────────────────────────────
    const categories = [
      [1,'Beverages','Soft drinks, coffees, teas, beers, and ales'],
      [2,'Condiments','Sweet and savory sauces, relishes, spreads, and seasonings'],
      [3,'Confections','Desserts, candies, and sweet breads'],
      [4,'Dairy Products','Cheeses'],
      [5,'Grains/Cereals','Breads, crackers, pasta, and cereal'],
      [6,'Meat/Poultry','Prepared meats'],
      [7,'Produce','Dried fruit and bean curd'],
      [8,'Seafood','Seaweed and fish'],
    ];
    for (const c of categories) {
      alasql(`INSERT INTO Categories VALUES (${c[0]},'${c[1]}','${c[2]}')`);
    }

    // ── Products ────────────────────────────────────────────
    const products = [
      [1,'Chais',1,1,'10 boxes x 20 bags',18.00],
      [2,'Chang',1,1,'24 - 12 oz bottles',19.00],
      [3,'Aniseed Syrup',1,2,'12 - 550 ml bottles',10.00],
      [4,'Chef Anton\'s Cajun Seasoning',2,2,'48 - 6 oz jars',22.00],
      [5,'Chef Anton\'s Gumbo Mix',2,2,'36 boxes',21.35],
      [6,'Grandma\'s Boysenberry Spread',3,2,'12 - 8 oz jars',25.00],
      [7,'Uncle Bob\'s Organic Dried Pears',3,7,'12 - 1 lb pkgs.',30.00],
      [8,'Northwoods Cranberry Sauce',3,2,'12 - 12 oz jars',40.00],
      [9,'Mishi Kobe Niku',4,6,'18 - 500 g pkgs.',97.00],
      [10,'Ikura',4,8,'12 - 200 ml jars',31.00],
      [11,'Queso Cabrales',5,4,'1 kg pkg.',21.00],
      [12,'Queso Manchego La Pastora',5,4,'10 - 500 g pkgs.',38.00],
      [13,'Konbu',4,8,'2 kg box',6.00],
      [14,'Tofu',6,7,'40 - 100 g pkgs.',23.25],
      [15,'Genen Shouyu',4,2,'24 - 250 ml bottles',15.50],
    ];
    for (const p of products) {
      alasql(`INSERT INTO Products VALUES (${p[0]},'${p[1]}',${p[2]},${p[3]},'${p[4]}',${p[5]})`);
    }

    // ── Employees ───────────────────────────────────────────
    const employees = [
      [1,'Davolio','Nancy','1968-12-08','EmpID1.pic','Education includes a BA in psychology.'],
      [2,'Fuller','Andrew','1952-02-19','EmpID2.pic','Andrew received his BTS commercial.'],
      [3,'Leverling','Janet','1963-08-30','EmpID3.pic','Janet has a BS in chemistry.'],
      [4,'Peacock','Margaret','1958-09-19','EmpID4.pic','Margaret holds a BA in English literature.'],
      [5,'Buchanan','Steven','1955-03-04','EmpID5.pic','Steven Buchanan graduated from St. Andrews University.'],
    ];
    for (const e of employees) {
      alasql(`INSERT INTO Employees VALUES (${e[0]},'${e[1]}','${e[2]}','${e[3]}','${e[4]}','${e[5]}')`);
    }

    // ── Shippers ────────────────────────────────────────────
    alasql(`INSERT INTO Shippers VALUES (1,'Speedy Express','(503) 555-9831')`);
    alasql(`INSERT INTO Shippers VALUES (2,'United Package','(503) 555-3199')`);
    alasql(`INSERT INTO Shippers VALUES (3,'Federal Shipping','(503) 555-9931')`);

    // ── Orders ──────────────────────────────────────────────
    const orders = [
      [10248,1,5,'1996-07-04',3],[10249,2,6,'1996-07-05',1],
      [10250,3,4,'1996-07-08',2],[10251,4,3,'1996-07-08',1],
      [10252,5,4,'1996-07-09',2],[10253,6,3,'1996-07-10',2],
      [10254,7,5,'1996-07-11',2],[10255,8,9,'1996-07-12',3],
      [10256,9,3,'1996-07-15',2],[10257,10,4,'1996-07-16',3],
      [10258,1,1,'1996-07-17',1],[10259,2,4,'1996-07-18',3],
      [10260,3,4,'1996-07-19',1],[10261,4,4,'1996-07-19',2],
      [10262,5,8,'1996-07-22',3],
    ];
    for (const o of orders) {
      alasql(`INSERT INTO Orders VALUES (${o[0]},${o[1]},${o[2]},'${o[3]}',${o[4]})`);
    }

    // ── OrderDetails ────────────────────────────────────────
    const details = [
      [1,10248,1,12],[2,10248,2,10],[3,10249,3,5],[4,10249,4,9],
      [5,10250,5,10],[6,10250,6,35],[7,10251,7,6],[8,10251,8,15],
      [9,10252,9,25],[10,10252,10,40],[11,10253,11,20],[12,10253,12,42],
      [13,10254,13,14],[14,10255,14,9],[15,10256,15,15],
    ];
    for (const d of details) {
      alasql(`INSERT INTO OrderDetails VALUES (${d[0]},${d[1]},${d[2]},${d[3]})`);
    }

    this.initialized.set(true);
  }

  execute(query: string): SqlResult {
    if (!this.alasql) throw new Error('Database not initialized');
    const results = this.alasql(query);
    if (!Array.isArray(results) || results.length === 0) {
      return { rows: [], columns: [] };
    }
    const columns = Object.keys(results[0]);
    return { rows: results, columns };
  }
}
