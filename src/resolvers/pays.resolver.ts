import { Resolver, Query, Arg } from "type-graphql";
import { Pays } from "../entities/pays.entity";
import PaysService from "../services/pays.service";

@Resolver(Pays)
export default class PaysResolver {
  private paysService = new PaysService();

  @Query(() => [Pays])
  async pays() {
    try {
      return await this.paysService.listPays();
    } catch (error) {
      console.error("Error in pays query:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des pays.");
    }
  }

  @Query(() => Pays, { nullable: true })
  async getPaysById(@Arg("id") id: number) {
    try {
      const pays = await this.paysService.getPaysById(id);
      if (!pays) {
        throw new Error("Pays not found");
      }
      return pays;
    } catch (error) {
      console.error("Error in getPaysById query:", error);
      throw new Error("Une erreur s'est produite lors de la récupération du pays.");
    }
  }
}
