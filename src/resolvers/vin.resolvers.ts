import { Resolver, Query, Args, Arg, Mutation } from "type-graphql";
import { Vin } from "../entities/vin.entity";
import VinService from "../services/vin.service";

@Resolver(Vin)
export default class VinResolver {
  constructor(private readonly vinService: VinService) {}

  @Query(() => [Vin])
  async vins() {
    try {
      return await this.vinService.listVins();
    } catch (error) {
      console.error("Error in vins query:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des vins.");
    }
  }

//   @Query(() => Vin, { nullable: true })
//   async getVinById(@Arg("id") id: number): Promise<Vin | null> {
//     try {
//       return await this.vinService.getVinById(id);
//     } catch (error) {
//       console.error("Error in getVinById query:", error);
//       throw new Error("Une erreur s'est produite lors de la récupération du vin.");
//     }
//   }

  @Query(() => [Vin])
  async getVinByColor(@Arg("couleur") couleur: string): Promise<Vin[]> {
    try {
      return await this.vinService.getVinByColor(couleur);
    } catch (error) {
      console.error(`Error retrieving vins for couleur '${couleur}':`, error);
      throw new Error("Une erreur s'est produite lors de la récupération des vins par couleur.");
    }
  }

  @Mutation(() => Vin)
  async addVin(
    @Arg("couleur") couleur: string ) {
    try {
      return await this.vinService.addVin({ couleur });
    } catch (error) {
      console.error("Error in addVin mutation:", error);
      throw new Error("Une erreur s'est produite lors de l'ajout d'un vin'.");
    }
  }

  @Mutation(() => Vin, { nullable: true })
  async updateVin(
    @Arg("id") id: number,
    @Arg("couleur") couleur: string ) {
    try {
      return await this.vinService.updateVin(id, { id, couleur });
    } catch (error) {
      console.error("Error in updateVin mutation:", error);
      throw new Error("Une erreur s'est produite lors de la mise à jour d'un vin.");
    }
  }

  @Mutation(() => Boolean)
  async deleteVin(@Arg("id") id: number) {
    console.log('Resolver: Deleting vin with ID:', id);
    try {
      const success = await this.vinService.deleteVin(id);
      return success;
    } catch (error) {
      console.error("Error in deleteVin mutation:", error);
      throw new Error("Une erreur s'est produite lors de la suppression du vin.");
    }
  }
}
