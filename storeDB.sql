/*CREATE DATABASE theStore;*/
USE berfinp9tsh1k6yqu993;

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
    name varchar(255) not null,     
    description varchar(1024) not null,     
    amount int not null,     
    price int not null,     
    minStock int not null 
);

insert into products (name, description, amount, price, minStock)
values ("Lego technic cazador policiaco carro policia", "¡Acciona el motor de carga manual y emprende una persecución a toda velocidad con el potente Cazador Policial LEGO® Technic (42091)!", 50, 159920, 5),
("Armable Lego Dc Batman Batmóvil Caza De The Penguin", "Este Batmóvil preparado para el combate está equipado con 2 cañones automáticos que lanzan mega misiles simultánea o individualmente cuando los pequeños presionan las placas del capó.", 15, 219900, 5),
("Set De Lego Disney Buzz Lightyear Nave Espacial Xl-15 76832", "Deja que los fanáticos del espacio a partir de los 8 años jueguen al héroe en su propia aventura intergaláctica con el juguete coleccionable para construir XL-15 Spaceship (76832).", 15, 399900, 5),
("DRAGÓN DEL FUEGO EVO DE KAI", "Pon en las manos de tu peque de 6 años o más todo lo que necesita para vivir trepidantes aventuras ninja con el juego construible Dragón del Fuego EVO de Kai (71762). El dragón de juguete posee mandíbula, cabeza, cola y patas articuladas y puede transformarse en una criatura más grande, fuerte y rápida.", 20, 249900, 5),
("Armable Lego Speed Champions Toyota Gr Supra", "Este coche de juguete coleccionable, por su chasis amplio, cuenta con espacio para una cabina biplaza y aún más elementos de extraordinario realismo.", 25, 159900, 5),
("LEGO Star Wars Millennium Falcon 75257", "Esta versión para construir del emblemático carguero Corelliano cuenta con numerosos detalles, como torretas defensivas superior e inferior giratorias, 2 cañones automáticos, una rampa descendente y una cabina abatible con espacio para 2 minifiguras.", 15, 994777, 5),
("LEGO Technic Lamborghini Sián FKP 37 42115", "Explora las características fieles del modelo del coche, incluyendo motor V12 con pistones móviles, dirección, suspensión delantera y trasera.", 25, 159900, 5),
("LEGO 10227 Star Wars UCS B-wing luchador", "Este fantástico modelo presenta todo lo que esperaría de nuestra gama de coleccionistas premium, incluida la cabina giratoria y autonivelante y configuraciones de alas realistas para aterrizar y volar.", 25, 6093777, 5),
("LEGO Creator Oficina del Detective de Expertos", "¡Descubre un mundo de misterio y aventura con la Oficina del Detective, de LEGO® Creator Expert! Atraviesa el arco y entra en la barbería, donde los clientes reciben atenciones mientras se miran en el gran espejo de pared.", 25, 5015777, 5),
("Nifeliz DIVN Race Car MOC Building Kit", "kit de construcción y juguete de ingeniería, kit de construcción de coche deportivo coleccionable para adultos, modelo de coche deportivo a escala 1:8.", 25, 1097777, 5),
("Bourvill Kit de luces LED para casco Lego Boba Fett 75277", "Juego de luces compatible con Lego 75277 – Versión clásica (kit de luces sin modelo)", 25, 264777, 5),
("LEGO Star Wars Captain Rex – Juego de casco 75349 The Clone Wars coleccionable", "Muestra respeto por un gran comandante clon de la Legión 501 con este juego de casco coleccionable de LEGO Star Wars Captain Rex (75349).", 25, 499777, 5);



DROP TABLE products;
select * from products;

/*NO EJECUTAR ESTA PARTE*/
/*Administradores opcionales, se considerará inserción en la tabla posteriormente*/
insert into administrators (name, password, email, address, phone)
values ("andres", "decode@810", "andres.palacio@utp.edu.co", "pereira", 3013004022);
insert into administrators (name, password, email, address, phone)
values ("jefferson", "hacking#77", "david.arteaga@utp.edu.co", "dosquebradas", 3185002087);
