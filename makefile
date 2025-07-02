
db/start:
	docker run --rm -d --name vtt_db -p 5432:5432 -v vtt_data:/var/lib/postgresql/data postgres:17.1-alpine

db/stop:
	docker stop vtt_db
