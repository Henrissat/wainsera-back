import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Cepage } from "../entities/cepage.entity";
import CepageService from "../services/cepage.service";


@Resolver(Cepage)
export default class CepageResolver {
  private cepageService = new CepageService();

  @Query(() => [Cepage])
  async cepages() {
    try {
      return await this.cepageService.listCepages();
    } catch (error) {
      console.error("Error in cepages query:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des cépages.");
    }
  }

  @Query(() => Cepage, { nullable: true })
  async getCepageById(@Arg("id") id: number) {
    try {
      const cepage = await this.cepageService.getCepageById(id);
      if (!cepage) {
        throw new Error("Cepage not found");
      }
      return cepage;
    } catch (error) {
      console.error("Error in getCepageById query:", error);
      throw new Error("Une erreur s'est produite lors de la récupération du cépage.");
    }
  }

  @Mutation(() => Cepage)
  async addCepage(@Arg("nom_cepage") nom_cepage: string) {
    try {
      return await this.cepageService.addCepage({ nom_cepage });
    } catch (error) {
      console.error("Error in addCepage mutation:", error);
      throw new Error("Une erreur s'est produite lors de l'ajout du cépage.");
    }
  }

  @Mutation(() => Cepage, { nullable: true })
  async updateCepage(
    @Arg("id") id: number,
    @Arg("nom_cepage", { nullable: true }) nom_cepage?: string
  ) {
    try {
      return await this.cepageService.updateCepage(id, { id, nom_cepage });
    } catch (error) {
      console.error("Error in updateCepage mutation:", error);
      throw new Error("Une erreur s'est produite lors de la mise à jour du cépage.");
    }
  }

  @Mutation(() => Boolean)
  async deleteCepage(@Arg("id") id: number) {
    try {
      const success = await this.cepageService.deleteCepage(id);
      return success;
    } catch (error) {
      console.error("Error in deleteCepage mutation:", error);
      throw new Error("Une erreur s'est produite lors de la suppression du cépage.");
    }
  }
}
