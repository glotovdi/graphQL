import { RESTDataSource } from "@apollo/datasource-rest";

export class FactAPI extends RESTDataSource {
  override baseURL = "https://catfact.ninja";

  async getFact(id: string): Promise<any> {
    return this.get<any>(`fact`);
  }
}
