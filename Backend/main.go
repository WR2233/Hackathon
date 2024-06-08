package main

import (
	"log"
	"net/http"
	"github.com/WR2233/Hackathon/Backend/controller"
)

func main() {
	controller.Handler()
	log.Fatal(http.ListenAndServe(":8000", nil))
}
