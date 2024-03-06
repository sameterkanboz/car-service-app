.PHONY: start start-client ngrok

start: 
	@echo "Starting Postgresql database..."
	@cd car-service-server && docker compose up -d
	@echo "Postgresql database is running..."
	@echo "Starting the backend..."
	@cd car-service-server && go run ./cmd/api &
	@echo "Backend is running..."
	@echo "All services are running..."

start-client:
	@echo "Starting the frontend..."
	@cd car-service-client && npx expo start &
	@echo "Frontend is running in a separate terminal..."

ngrok:
	@echo "Starting the ngrok..."
	@cd ngrok http --domain=osprey-evident-needlessly.ngrok-free.app 8080
	@echo "ngrok is running..."