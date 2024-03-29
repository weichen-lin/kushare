run-postgres:
	docker run --rm \
	-v kushare-postgres:/var/lib/postgresql/data \
	-dp 5432:5432 \
	--name stargazer-postgres \
	-e POSTGRES_DB=mydb \
	-e POSTGRES_USER=johndoe \
	-e POSTGRES_PASSWORD=randompassword \
	postgres:13-alpine