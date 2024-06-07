package main

import (
	"net/http"
	"github.com/WR2233/Hackathon/Backend/controller"
)

func main() {
	controller.Handler()
	http.ListenAndServe(":8000", nil)
}
package main

import (
    "log"
    "net/http"
    "github.com/gorilla/mux"
    "github.com/WR2233/Hackathon/Backend/controller"
)

func main() {
    Handler()
    log.Fatal(http.ListenAndServe(":8000", r))
}
