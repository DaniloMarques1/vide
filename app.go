package main

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

// App struct
type App struct {
	ctx    context.Context
	client *redis.Client
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// TODO: refactor another struct
// connect to redis
func (a *App) Connect(address string) error {
	log.Printf("Address received %v\n", address)
	if len(address) == 0 {
		return errors.New("Address is required")
	}

	a.client = redis.NewClient(&redis.Options{
		Addr: address,
	})
	if _, err := a.client.Ping(context.Background()).Result(); err != nil {
		return err
	}

	return nil
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) shutdown(ctx context.Context) {
	// clean up resources
	log.Printf("Closing application\n")
}
