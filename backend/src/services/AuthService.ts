import { Service } from "typedi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database";
import { User } from "../entities/User";

@Service()
export class AuthService {
  private userRepository = AppDataSource.getMongoRepository(User);

  async register(username: string, password: string, email: string): Promise<any> {
    const existingUser = await this.userRepository.findOne({ where: { username } });
    const existingEmail = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new Error("Username already exists");
    }

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({ username, password: hashedPassword, email });
    await this.userRepository.save(user);

    return { message: "User registered successfully" };
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Missmatch password");
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });

    return { token };
  }
}
