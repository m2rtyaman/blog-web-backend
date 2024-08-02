import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(dto: AuthDto) {
        const hashedPass = await bcrypt.hash(dto.password, 10)
        const newUser = this.userRepo.create(dto)
        newUser.email = dto.email
        newUser.password = hashedPass
        const user = await this.userRepo.save(newUser)
        return this.createToken(user.id)
    }
    createToken(id: string) {
        return this.jwtService.sign({ id })
    }
    async login(dto: AuthDto) {
        const user = await this.userRepo.findOne({ where: { email: dto.email } })
        if (!user) {
            throw new UnauthorizedException("Wrong email")
        } else {
            const isMatch = await bcrypt.compare(dto.password, user.password)
            if (!isMatch) {
                throw new UnauthorizedException("Wrong password")
            }
            return this.createToken(user.id)
        }
    }
}
