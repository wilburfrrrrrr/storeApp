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


/*NO EJECUTAR ESTA PARTE*/
/*Administradores opcionales, se considerará inserción en la tabla posteriormente*/
insert into administrators (name, password, email, address, phone)
values ("andres", "decode@810", "andres.palacio@utp.edu.co", "pereira", 3013004022);
insert into administrators (name, password, email, address, phone)
values ("jefferson", "hacking#77", "david.arteaga@utp.edu.co", "dosquebradas", 3185002087);
