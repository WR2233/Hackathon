package main

import (
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"

	"github.com/WR2233/Hackathon/Backend/controller"
	"github.com/WR2233/Hackathon/Backend/dao"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	//データベース初期化
	err = dao.InitDB()
	if err != nil {
		log.Fatalf("Failed to Initialize database: %v", err)
	}

	defer dao.CloseDB()

	//ハンドラの設定
	controller.Handler()
	// PORT 環境変数からポート番号を取得する
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // デフォルトのポート番号
	}

	log.Println("Starting server on ", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
