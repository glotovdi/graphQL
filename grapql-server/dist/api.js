import { RESTDataSource } from "@apollo/datasource-rest";
export class MoviesAPI extends RESTDataSource {
    constructor() {
        super(...arguments);
        this.baseURL = "https://movies-api.example.com/";
    }
    async getMovie(id) {
        return this.get(`movies/${encodeURIComponent(id)}`);
    }
    async getMostViewedMovies(limit = "10") {
        const data = await this.get("movies", {
            params: {
                per_page: limit.toString(),
                order_by: "most_viewed",
            },
        });
        return data.results;
    }
}
