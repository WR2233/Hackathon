package main

import (
	"log"
	"net/http"

	"github.com/WR2233/Hackathon/Backend/controller"
	"github.com/WR2233/Hackathon/Backend/dao"
)

func main() {
	//データベース初期化
	err := dao.InitDB()
	if err != nil {
		log.Fatalf("Failed to Initialize database: %v", err)
	}
	defer dao.CloseDB()

	//ハンドラの設定
	controller.Handler()

	//サーバー起動
	port := ":8080"
	log.Println("Starting server on ", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
