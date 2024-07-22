import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Bouteille } from "../entities/bouteille.entity";
import BouteilleService from "../services/bouteille.service";
import { IAddBouteille } from "../resolvers/bouteille";

@Resolver(Bouteille)
export default class BouteilleResolver {
  private bouteilleService = new BouteilleService();

  @Query(() => [Bouteille])
  async bouteilles() {
    try {
      return await this.bouteilleService.listBouteilles();
    } catch (error) {
      console.error("Error in bouteilles query:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des bouteilles.");
    }
  }

  @Query(() => Bouteille, { nullable: true })
  async getBouteilleById(@Arg("id") id: number) {
    try {
      const bouteille = await this.bouteilleService.getBouteilleById(id);
      if (!bouteille) {
        throw new Error("Bouteille not found");
      }
      return bouteille;
    } catch (error) {
      console.error("Error in getBouteilleById query:", error);
      throw new Error("Une erreur s'est produite lors de la récupération de la bouteille.");
    }
  }

  // @Mutation(() => Bouteille)
  // async addBouteille(
  //   @Arg("bouteille") bouteilleInput: IAddBouteille
  // ) {
  //   try {
  //     return await this.bouteilleService.addBouteille(bouteilleInput);
  //   } catch (error) {
  //     console.error("Error in addBouteille mutation:", error);
  //     throw new Error("Une erreur s'est produite lors de l'ajout de la bouteille.");
  //   }
  // }

  // @Mutation(() => Bouteille, { nullable: true })
  // async updateBouteille(
  //   @Arg("id") id: number,
  //   @Arg("millesime") millesime: number,
  //   @Arg("alcool") alcool: number,
  //   @Arg("quantite") quantite: number
  // ) {
  //   try {
  //     return await this.bouteilleService.updateBouteille(id, { id, millesime, alcool, quantite });
  //   } catch (error) {
  //     console.error("Error in updateBouteille mutation:", error);
  //     throw new Error("Une erreur s'est produite lors de la mise à jour de la bouteille.");
  //   }
  // }

  @Mutation(() => Boolean)
  async deleteBouteille(@Arg("id") id: number) {
    console.log('Resolver: Deleting bouteille with ID:', id);
    try {
      const success = await this.bouteilleService.deleteBouteille(id);
      return success;
    } catch (error) {
      console.error("Error in deleteBouteille mutation:", error);
      throw new Error("Une erreur s'est produite lors de la suppression de la bouteille.");
    }
  }
}
