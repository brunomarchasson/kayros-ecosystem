CREATE TABLE
  dbo.FMAIL_DCT (
    Code_Société char(2) COLLATE French_CI_AS NOT NULL,
    Type_Ident_F char(1) COLLATE French_CI_AS NOT NULL,
    Ident int NOT NULL,
    Indice int NOT NULL,
    Adr_E_Mail varchar(100) COLLATE French_CI_AS NULL,
    CONSTRAINT F_MAIL_DCT_PK PRIMARY KEY (Code_Société, Type_Ident_F, Ident, Indice)
  );

CREATE TABLE
  dbo.F_CORRES_DCT (
    Code_Société char(2) COLLATE French_CI_AS NOT NULL,
    Type_Ident_F char(1) COLLATE French_CI_AS NOT NULL,
    Ident int NOT NULL,
    Rang_Corr int NOT NULL,
    password varchar(100) COLLATE French_CI_AS NULL,
    CONSTRAINT F_CORRES_DCT_PK PRIMARY KEY (Code_Société, Type_Ident_F, Ident, Rang_Corr)
  );
