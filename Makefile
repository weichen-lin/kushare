run-postgre:
	docker run --rm \
	-it \
	-dp 5432:5432 \
	--name pg \
	-e POSTGRES_DB=local \
	-e POSTGRES_USER=postgres \
	-e POSTGRES_PASSWORD=password \
	postgres:15-alpine