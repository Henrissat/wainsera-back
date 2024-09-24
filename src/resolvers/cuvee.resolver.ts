// cuvee.resolver.ts
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Cuvee } from "../entities/cuvee.entity";
import CuveeService from "../services/cuvee.service";

@Resolver(Cuvee)
export default class CuveeResolver {
  private cuveeService = new CuveeService();

  @Query(() => [Cuvee])
  async cuvees() {
    try {
      return await this.cuveeService.listCuvees();
    } catch (error) {
      console.error("Error in cuvees query:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des cuvées.");
    }
  }

  @Query(() => Cuvee, { nullable: true })
  async getCuveeById(@Arg("id") id: number) {
    try {
      const cuvee = await this.cuveeService.getCuveeById(id);
      if (!cuvee) {
        throw new Error("Cuvee not found");
      }
      return cuvee;
    } catch (error) {
      console.error("Error in getCuveeById query:", error);
      throw new Error("Une erreur s'est produite lors de la récupération de la cuvée.");
    }
  }

  @Mutation(() => Cuvee)
  async addCuvee(
    @Arg("nom_domaine") nom_domaine: string
  ) {
    try {
      return await this.cuveeService.addCuvee({ nom_domaine });
    } catch (error) {
      console.error("Error in addCuvee mutation:", error);
      throw new Error("Une erreur s'est produite lors de l'ajout de la cuvée.");
    }
  }

  @Mutation(() => Cuvee, { nullable: true })
  async updateCuvee(
    @Arg("id") id: number,
    @Arg("nom_domaine", { nullable: true }) nom_domaine?: string
  ) {
    try {
      return await this.cuveeService.updateCuvee(id, { id, nom_domaine });
    } catch (error) {
      console.error("Error in updateCuvee mutation:", error);
      throw new Error("Une erreur s'est produite lors de la mise à jour de la cuvée.");
    }
  }

  @Mutation(() => Boolean)
  async deleteCuvee(@Arg("id") id: number) {
    console.log('Resolver: Deleting cuvee with ID:', id);
    try {
      const success = await this.cuveeService.deleteCuvee(id);
      return success;
    } catch (error) {
      console.error("Error in deleteCuvee mutation:", error);
      throw new Error("Une erreur s'est produite lors de la suppression de la cuvée.");
    }
  }
}
