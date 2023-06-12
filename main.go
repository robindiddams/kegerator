package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// read file
		data, err := os.ReadFile("index.html")
		if err != nil {
			fmt.Println("error reading file", err)
			w.Write([]byte("error reading file"))
			return
		}
		fmt.Println(string(data))
		w.Write(data)
	})
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err)
	}

}
