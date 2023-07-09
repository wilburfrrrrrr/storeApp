show databases;
CREATE DATABASE theStore;
USE theStore;

create table users (
	id int auto_increment primary key,
    name varchar(70) not null,
    email varchar(70) not null,
    password varchar(70) not null
);

select * from users;

create table administrators (
	id int auto_increment primary key,
    name varchar(70) not null,
    password varchar(70) not null,
    email varchar(70) not null,
    address varchar(70),
    phone int
);

insert into administrators (name, password, email, address, phone)
values ("generalAdmin", "encode%987", "none@mail.com", "at the office", 300);

select * from administrators;

create table products (  
    id int auto_increment primary key,  
    name varchar(70) not null,     
    description varchar(70) not null,     
    amount int not null,     
    price int not null,     
    minStock int not null 
);

-- Añadir productos
insert into products (name, description, amount, price, minStock)
values ("Armable Lego Dc Batman Batmóvil Caza De The Penguin", "PENDIENTE", 50, 159920, 5),
("Lego technic cazador policiaco carro policia", "PENDIENTE", 15, 219900, 5),
("Set De Lego Disney Buzz Lightyear Nave Espacial Xl-15 76832", "PENDIENTE", 15, 399900, 5),
("DRAGÓN DEL FUEGO EVO DE KAI", "PENDIENTE", 20, 249900, 5),
("Armable Lego Speed Champions Toyota Gr Supra", "PENDIENTE", 25, 159900, 5),
("LEGO Star Wars Millennium Falcon 75257", "PENDIENTE", 15, 994777, 5);

select * from products;



/*NO EJECUTAR ESTA PARTE*/
/*Administradores opcionales, se considerará inserción en la tabla posteriormente*/
insert into administrators (name, password, email, address, phone)
values ("andres", "decode@810", "andres.palacio@utp.edu.co", "pereira", 3013004022);
insert into administrators (name, password, email, address, phone)
values ("jefferson", "hacking#77", "david.arteaga@utp.edu.co", "dosquebradas", 3185002087);
