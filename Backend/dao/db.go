package db

import (
	"database/sql"
	"fmt"
	- "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func InitDB() error {
	var err error

	//MySQLに接続
	db, err = sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/")
	if err != nil {
		return err
	}

	//データベースへの接続を確認
	err = db.Ping()
	if err != nil {
		return err
	}
	fmt.Println("Successfully connected!")
	return nil
}

