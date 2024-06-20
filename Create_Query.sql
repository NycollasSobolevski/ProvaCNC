create database CNCTest
GO

USE CNCTest

GO
CREATE TABLE [user](
    [id] INT IDENTITY(1,1) PRIMARY KEY,
    [name] VARCHAR(255) not null,
    [identification] VARCHAR(255) not null,
    [password] VARCHAR(255) not null,
    [salt] VARCHAR(10) not null,
    [admin] bit not NULl,
    [is_active] bit not null,
)

GO
CREATE TABLE [test](
    [id] INT IDENTITY(1,1) PRIMARY KEY,
    [code] VARCHAR(25) NOT NULL UNIQUE,
    [title] VARCHAR(255) not null,
    [description] VARCHAR(255), 
    [attempts] int not null,
    [question] VARCHAR(MAX) not null,
    [answer] VARCHAR(MAX) not null,
    [is_active] bit not null
)

GO
CREATE TABLE [answers] (
    [id] INT IDENTITY(1,1) PRIMARY KEY,
    [student] varchar(255) not null,
    [answer] VARCHAR(MAX) not null,
    [attempts] int not null,
    [time] TIME not null,
    [grade] int,
    [id_test] int not null FOREIGN KEY REFERENCES test(id),
    [is_active] bit not null,
)
GO 

ALTER TABLE [user]
    ADD CONSTRAINT DefaultActived
    DEFAULT 1 for [is_active]
GO

ALTER TABLE [test]
    ADD CONSTRAINT DefaultTestActived
    DEFAULT 1 for [is_active]
GO

ALTER TABLE [answers]
    ADD CONSTRAINT DefaultAnswerActived
    DEFAULT 1 for [is_active]
GO