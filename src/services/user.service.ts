import bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import { User } from "../entities/user.entity";
import { IAddUser, IUpdateUser } from "../resolvers/user.input";
import { generateToken } from '../lib/utilities';

export default class UserService {
  private db: Repository<User>;

  constructor() {
    this.db = datasource.getRepository(User);
  }


  async listUsers(): Promise<User[]> {
    try {
      const users = await this.db.find();
      return users;
    } catch (error) {
      console.error("Error listing users:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des utilisateurs.");
    }
  }


  async getUserById(id: string): Promise<User | null> {
    try {
      return await this.db.findOne({ where: { id } });
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw new Error("Une erreur s'est produite lors de la récupération de l'utilisateur.");
    }
  }

  async getUserByEmail(email: string) {
    if (email) {
      return await this.db.findOneBy({ email });
    } else {
      return null;
    }
  }

  async addUser(input: IAddUser & { password: string }): Promise<{ user: User; token: string }> {
    try {
      console.log("Input received:", input); 
      const hashedPassword = await bcrypt.hash(input.password, 10);
      console.log("Password hashed:", hashedPassword); 
  
      const user = await this.db.save({
        fullname: input.fullname,
        email: input.email,
        password: hashedPassword,
      });
      console.log("User saved:", user);
  
      const token = generateToken({ email: user.email });
      console.log("Token generated:", token);
  
      return { user, token };
    } catch (error) {
      console.error("Error adding user in service:", error);
      throw new Error("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
    }
  }
  

  async updateUser(id: string, { fullname, email, password }: IUpdateUser): Promise<User> {
    console.log('Updating user with ID:', id);
    try {
      const existingUser = await this.db.findOne({ where: { id } });
      if (!existingUser) {
        throw new Error("User not found");
      }

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
