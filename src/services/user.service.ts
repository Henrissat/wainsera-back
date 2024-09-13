import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import { User } from "../entities/user.entity";
import { IAddUser, IUpdateUser } from "../resolvers/user";

export default class UserService {
  private db: Repository<User>;

  constructor() {
    this.db = datasource.getRepository(User);
  }

  // Liste tous les utilisateurs
  async listUsers(): Promise<User[]> {
    try {
      const users = await this.db.find();
      return users;
    } catch (error) {
      console.error("Error listing users:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des utilisateurs.");
    }
  }

  // Récupère un utilisateur par ID
  async getUserById(id: string): Promise<User | null> {
    try {
      return await this.db.findOne({ where: { id } });
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw new Error("Une erreur s'est produite lors de la récupération de l'utilisateur.");
    }
  }

  // Ajoute un nouvel utilisateur
  async addUser({ fullname, email, password }: IAddUser): Promise<User> {
    try {
      const newUser = this.db.create({ fullname, email, password });
      return await this.db.save(newUser);
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
    }
  }

  // Met à jour un utilisateur
  async updateUser(id: string, { fullname, email, password }: IUpdateUser): Promise<User> {
    console.log('Updating user with ID:', id);
    try {
      const existingUser = await this.db.findOne({ where: { id } });
      if (!existingUser) {
        throw new Error("User not found");
      }

      // Mise à jour des champs
      if (fullname !== undefined) {
        existingUser.fullname = fullname;
      }
      if (email !== undefined) {
        existingUser.email = email;
      }
      if (password !== undefined) {
        existingUser.password = password;
      }

      return await this.db.save(existingUser);
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Une erreur s'est produite lors de la mise à jour de l'utilisateur.");
    }
  }

  // Supprime un utilisateur
  async deleteUser(id: string): Promise<boolean> {
    console.log('Deleting user with ID:', id);
    try {
      const existingUser = await this.db.findOne({ where: { id } });
      if (!existingUser) {
        throw new Error("User not found");
      }

      await this.db.remove(existingUser);
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Une erreur s'est produite lors de la suppression de l'utilisateur.");
    }
  }
}
