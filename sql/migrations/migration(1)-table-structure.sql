create table images (
	imageId int4 unsigned primary key auto_increment,
	imageUrl varchar(256) not null,
	createdAt timestamp default current_timestamp,
	updatedAt timestamp default current_timestamp on update current_timestamp
);

create table products (
	productId int4 unsigned primary key auto_increment,
	productTitle varchar(256) not null,
    productInventory longtext not null ,
    imageId int4 unsigned not null,
    productPrice float not null,
    createdAt timestamp default current_timestamp,
	updatedAt timestamp default current_timestamp on update current_timestamp,
    foreign key (imageId) references images(imageId) );

create table users (
  userId int4 unsigned primary key auto_increment,
  username varchar(64) not null unique,
  email varchar(64) not null unique,
  password varchar(64) not null,
  firstName varchar(64) not null,
  lastName varchar(64) not null,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp
);

create table orders (
	orderId int4 unsigned primary key auto_increment,
    userId int4 unsigned not null,
    productId int4 unsigned not null,
    
    createdAt timestamp default current_timestamp,
	updatedAt timestamp default current_timestamp on update current_timestamp,
    foreign key (userId) references users(userId),
	foreign key (productId) references products(productId)
);

create table adminsAndModerators (
  accountId int4 unsigned primary key auto_increment,
  username varchar(64) not null unique,
  email varchar(64) not null unique,
  password varchar(64) not null,
  firstName varchar(64) not null,
  lastName varchar(64) not null,
  accountType tinyint not null,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp
);