package dao

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"os"
)

var db *sql.DB

func InitDB() error {
	var err error

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	instanceConnectionName := os.Getenv("INSTANCE_CONNECTION_NAME")

	// Cloud SQLインスタンスへの接続を設定
	dsn := fmt.Sprintf("%s:%s@%s/%s", dbUser, dbPassword, instanceConnectionName, dbName)

	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("mysql.NewConnector: %v", err)
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

func GetDB() (*sql.DB, error) {
	if db == nil {
		err := InitDB()
		if err != nil {
			return nil, err
		}
	}
	return db, nil
}
