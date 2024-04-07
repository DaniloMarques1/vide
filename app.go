package main

import (
	"context"
	"errors"
	"log"

	"github.com/redis/go-redis/v9"
)

// App struct
type App struct {
	ctx    context.Context
	client *redis.Client
	addr   string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// TODO: refactor another struct
// connect to redis
func (a *App) Connect(addr string) error {
	log.Printf("Address received %v\n", addr)
	if len(addr) == 0 {
		return errors.New("Address is required")
	}

	a.client = redis.NewClient(&redis.Options{
		Addr: addr,
	})
	if _, err := a.client.Ping(context.Background()).Result(); err != nil {
		return err
	}

	return nil
}

func (a *App) GetAddress() string {
	log.Printf("Get Address IN\n")
	return a.addr
}

func (a *App) Disconect() error {
	return a.client.Close()
}

func (a *App) Get(key string) (string, error) {
	log.Printf("Searching for key %s\n", key)
	val, err := a.client.Get(context.Background(), key).Result()
	if err != nil {
		return "", err
	}
	return val, nil
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) shutdown(ctx context.Context) {
	// clean up resources
	log.Printf("Closing application\n")
	a.Disconect()
}
