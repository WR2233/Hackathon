package main

import (
	"github.com/WR2233/Hackathon/Backend/controller"
	"github.com/WR2233/Hackathon/Backend/dao"
	"log"
	"net/http"
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
	port := ":8000"
	log.Println("Starting server on ", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
