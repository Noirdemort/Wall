drop DATABASE if EXISTS client;
create DATABASE client;
use client;

CREATE TABLE clients(
    c_name VARCHAR(255) not null,
    file_no int PRIMARY KEY,
    pan_card CHAR(10) UNIQUE,
    remarks VARCHAR(255)
);

CREATE table filings(
    filing_id int auto_increment PRIMARY KEY,
    asmt_year year(4) not null,
    dof date not null,
    return_income FLOAT not null,
    tax FLOAT not null,
    filen int not null,
    total_fee float,
    fee_recieved float,
    dor date,
    FOREIGN KEY (filen) REFERENCES clients(file_no) ON DELETE CASCADE
);



