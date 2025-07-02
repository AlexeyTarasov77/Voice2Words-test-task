
db/start:
	docker run -d --rm --name vtw_db -p 5432:5432 --env-file .env -v vtw_data:/var/lib/postgresql/data postgres:17.1-alpine

db/stop:
	docker stop vtw_db
