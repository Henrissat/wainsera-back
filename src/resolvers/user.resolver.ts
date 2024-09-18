import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import UserService from "../services/user.service";
import { User } from "../entities/user.entity";
import { IAddUser, IAddUserInput, IUpdateUser, IUser } from "../resolvers/user.input";
import { generateToken } from "../lib/utilities";
import bcrypt from 'bcrypt';
import { LoginResponse, LoginUser } from "./user.types";
import { ILoginInput } from "./login.input";


@Resolver()
export default class UserResolver {
  private userService = new UserService();

  @Query(() => [User])
  async listUsers(): Promise<User[]> {
    try {
      return await this.userService.listUsers();
    } catch (error) {
      console.error("Error listing users:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des utilisateurs.");
    }
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Arg("id", () => ID) id: string): Promise<User | null> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw new Error("Une erreur s'est produite lors de la récupération de l'utilisateur.");
    }
  }

  @Query(() => LoginResponse)
  async login(
    @Arg("input") input: ILoginInput
  ): Promise<LoginResponse> {
    const { email, password } = input;
  
    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new Error("Cet utilisateur n'existe pas");
      }
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Vérifiez vos informations");
      }
  
      const token = generateToken({ email });
  
      return { 
        user: {
          fullname: user.fullname,
          email: user.email
        },
        token
      };
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error("Une erreur s'est produite lors de la connexion.");
    }
  }
  

  
  @Mutation(() => User)
  async addUser(
    @Arg("input", () => IAddUser) input: IAddUser
  ): Promise<User> {
    try {
      console.log("Input received in resolver:", input);
      console.log("UserService instance:", this.userService);
      const result = await this.userService.addUser(input);
      console.log("Result from service:", result);
      return result.user; 
    } catch (error) {
      console.error("Error adding user in resolver:", error);
      throw new Error("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
    }
  }
  

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
