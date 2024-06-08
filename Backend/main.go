package main

import (
	"github.com/WR2233/Hackathon/Backend/controller"
	"log"
	"net/http"
)

func main() {
	controller.Handler()
	log.Fatal(http.ListenAndServe(":8000", nil))
	dao.InitDB()
}
