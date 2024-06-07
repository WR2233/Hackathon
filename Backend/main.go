package main

import (
	"log"
	"net/http"
	"github.com/WR2233/Hackathon/Backend"
)

func main() {
	Handler()
	log.Fatal(http.ListenAndServe(":8000", r))
}
