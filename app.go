package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

type ResponseError struct {
	Message string
	Code    int
}

func (re *ResponseError) Error() string {
	b, err := json.Marshal(re)
	if err != nil {
		return re.Message
	}
	return string(b)
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) (string, error) {
	if name == "Danilo" {
		log.Printf("Wrong name given\n")
		return "", &ResponseError{Message: "I wont greet Danilo", Code: 400}
	}
	return fmt.Sprintf("Hello %s, It's show time!", name), nil
}

func (a *App) PrintSomethingOnScreen() string {
	s := "Printing something"
	log.Printf("%s\n", s)
	return s
}

func (a *App) shutdown(ctx context.Context) {
	log.Printf("Closing application\n")
}
