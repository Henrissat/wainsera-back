import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Region } from "../entities/region.entity";
import RegionService from "../services/region.service";

@Resolver(Region)
export default class RegionResolver {
  private regionService = new RegionService();

  @Query(() => [Region])
  async regions() {
    try {
      return await this.regionService.listRegions();
    } catch (error) {
      console.error("Error in regions query:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des régions.");
    }
  }

  @Query(() => Region, { nullable: true })
  async getRegionById(@Arg("id") id: number) {
    try {
      const region = await this.regionService.getRegionById(id);
      if (!region) {
        throw new Error("Region not found");
      }
      return region;
    } catch (error) {
      console.error("Error in getRegionById query:", error);
      throw new Error("Une erreur s'est produite lors de la récupération de la région.");
    }
  }

  // @Mutation(() => Region)
  // async addRegion(@Arg("data") data: IAddRegion) {
  //   try {
  //     return await this.regionService.addRegion(data);
  //   } catch (error) {
  //     console.error("Error in addRegion mutation:", error);
  //     throw new Error("Une erreur s'est produite lors de l'ajout de la région.");
  //   }
  // }

  // @Mutation(() => Region, { nullable: true })
  // async updateRegion(@Arg("id") id: number, @Arg("data") data: IUpdateRegion) {
  //   try {
  //     return await this.regionService.updateRegion(id, data);
  //   } catch (error) {
  //     console.error("Error in updateRegion mutation:", error);
  //     throw new Error("Une erreur s'est produite lors de la mise à jour de la région.");
  //   }
  // }

  // @Mutation(() => Boolean)
  // async deleteRegion(@Arg("id") id: number) {
  //   try {
  //     const success = await this.regionService.deleteRegion(id);
  //     return success;
  //   } catch (error) {
  //     console.error("Error in deleteRegion mutation:", error);
  //     throw new Error("Une erreur s'est produite lors de la suppression de la région.");
  //   }
  // }
}
