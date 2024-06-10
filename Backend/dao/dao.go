package dao

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

var db *sql.DB

func InitDB() error {
	var err error

	//MySQLに接続
	db, err = sql.Open("mysql", "user:password@tcp(127.0.0.1:3306)/hackathon")
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

func CloseDB() {
	if db != nil {
		if err := db.Close(); err != nil {
			log.Fatal(err)
		}
	}
}

func GetDB() *sql.DB {
	return db
}
