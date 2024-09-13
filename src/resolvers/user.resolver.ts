import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import UserService from "../services/user.service";
import { User } from "../entities/user.entity";
import { IAddUser, IUpdateUser } from "../resolvers/user.d";

@Resolver()
export class UserResolver {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Liste tous les utilisateurs
  @Query(() => [User])
  async listUsers(): Promise<User[]> {
    try {
      return await this.userService.listUsers();
    } catch (error) {
      console.error("Error listing users:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des utilisateurs.");
    }
  }

  // Récupère un utilisateur par son ID
  @Query(() => User, { nullable: true })
  async getUserById(@Arg("id", () => ID) id: string): Promise<User | null> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw new Error("Une erreur s'est produite lors de la récupération de l'utilisateur.");
    }
  }

  // Ajoute un nouvel utilisateur
  @Mutation(() => User)
  async addUser(
    @Arg("input", () => IAddUser) input: IAddUser
  ): Promise<User> {
    try {
      return await this.userService.addUser(input);
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
    }
  }

  // Met à jour un utilisateur
  @Mutation(() => User)
  async updateUser(
    @Arg("id", () => ID) id: string,
    @Arg("input", () => IUpdateUser) input: IUpdateUser
  ): Promise<User> {
    try {
      return await this.userService.updateUser(id, input);
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Une erreur s'est produite lors de la mise à jour de l'utilisateur.");
    }
  }

  // Supprime un utilisateur
  @Mutation(() => Boolean)
  async deleteUser(
    @Arg("id", () => ID) id: string
  ): Promise<boolean> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Une erreur s'est produite lors de la suppression de l'utilisateur.");
    }
  }
}
