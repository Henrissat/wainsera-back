import { Resolver, Query, Args, Arg, Mutation } from "type-graphql";
import { Appellation } from "../entities/appellation.entity";

import AppellationService from "../services/appellation.service";

@Resolver(Appellation)
export default class AppellationResolver {
  private appellationService = new AppellationService();

  @Query(() => [Appellation])
  async vins() {
    try {
      return await this.appellationService.listAppellations();
    } catch (error) {
      console.error("Error in vins query:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des vins.");
    }
  }


  @Query(() => [Appellation])
  async getAppellationById(@Arg("id") id: number) {
    try {
      const appellation = await this.appellationService.getAppellationById(id);
      if (!appellation) {
        throw new Error("Appellation not found");
      }
      return appellation;
    } catch (error) {
      console.error("Error in getAppellationById query:", error);
      throw new Error("Une erreur s'est produite lors de la sélection de l'appellation.");
    }
  }
}