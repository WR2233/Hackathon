package main

import (
	"twitter/Backend/controller"
	"log"
	"net/http"
)

func main() {
	r 
	controller.Handler()
	http.ListenAndServe(":8000", nil)
}
