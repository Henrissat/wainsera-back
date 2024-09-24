import { Resolver, Query, Mutation, Arg } from "type-graphql";
import CasierService from "../services/casier.service";
import { Casier } from "../entities/casier.entity";
// import { IAddCasier, IUpdateCasier } from "./casier";

@Resolver()
export default class CasierResolver {
  private casierService = new CasierService();

  @Query(() => [Casier])
  async casiers(): Promise<Casier[]> {
    return this.casierService.listCasiers();
  }

  @Query(() => Casier, { nullable: true })
  async casier(@Arg("id") id: number): Promise<Casier | null> {
    return this.casierService.getCasierById(id);
  }

  // @Mutation(() => Casier)
  // async addCasier(@Arg("data") data: IAddCasier): Promise<Casier> {
  //   return this.casierService.addCasier(data);
  // }

  // @Mutation(() => Casier)
  // async updateCasier(@Arg("id") id: number, @Arg("data") data: IUpdateCasier): Promise<Casier> {
  //   return this.casierService.updateCasier(id, data);
  // }

  @Mutation(() => Boolean)
  async deleteCasier(@Arg("id") id: number): Promise<boolean> {
    return this.casierService.deleteCasier(id);
  }
}
